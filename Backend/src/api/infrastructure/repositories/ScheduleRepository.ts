import { IScheduleRepository } from "../../../core/interfaces/IScheduleRepository";
import { Schedule } from "../../../core/entities/Schedule";
import Schedules from "../db/models/Schedules";
import { ObjectId } from "mongodb";

export class ScheduleRepository implements IScheduleRepository {
  async save(schedule: Schedule): Promise<Schedule[] | null> {
    const existingSchedule = await Schedules.findOne({
      Route_Id: new ObjectId(schedule.routeId),
      Bus_Id: new ObjectId(schedule.busId),
      dateSlots: { $in: schedule.dateSlots }, 
      startTime: schedule.startTime,
    });

    if (existingSchedule) {
      return []; 
    }

    const scheduleToSave = new Schedules({
      Price: schedule.price,
      OwnerId: new ObjectId(schedule.ownerId),
      Operator_Id: schedule.operatorId ? new ObjectId(schedule.operatorId) : null,
      Bus_Id: new ObjectId(schedule.busId),
      Route_Id: new ObjectId(schedule.routeId),
      dateSlots: schedule.dateSlots,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      status: schedule.status,
      isActive: schedule.isActive,
    });


    const savedSchedule = await scheduleToSave.save();


    return [this.mapToEntity(savedSchedule)];
  
  
  }

  async findById(scheduleId: string): Promise<Schedule | null> {
    const scheduleDoc = await Schedules.findById(scheduleId).exec();
    if (!scheduleDoc) return null;
    return this.mapToEntity(scheduleDoc);
  }

  async findByRouteIdDate(routeId: string,date: string): Promise<Schedule[]> {
   
    const routeObjectId = new ObjectId(routeId);
    
    const queryDate = new Date(date);
    queryDate.setUTCHours(0, 0, 0, 0);  
    const nextDate = new Date(queryDate);
    nextDate.setUTCDate(queryDate.getUTCDate() + 1);  


    const scheduleDocs = await Schedules.find({
        Route_Id: routeObjectId,
        dateSlots: { 
            $gte: queryDate,  
            $lt: nextDate      
        }
    }).exec();


    return scheduleDocs.map((doc) => this.mapToEntity(doc));
    
  }

  async findByOwnerId(ownerId: string): Promise<Schedule[]> {
    const ownerObjectId = new ObjectId(ownerId);
    const scheduleDocs = await Schedules.aggregate([
      {
        $match: { OwnerId: ownerObjectId },
      },
      {
        $lookup: {
          from: "buses",
          localField: "Bus_Id",
          foreignField: "_id",
          as: "busDetails",
        },
      },
      {
        $lookup: {
          from: "routes",
          localField: "Route_Id",
          foreignField: "_id",
          as: "routeDetails",
        },
      },
      {
        $unwind: "$busDetails",
      },
      {
        $unwind: "$routeDetails",
      },
    ]).exec();

    return scheduleDocs.map((doc) =>
      this.mapToEntity({
        ...doc,
        busName: doc.busDetails?.Name,
        routeSource: doc.routeDetails?.Source,
        routeDestination: doc.routeDetails?.Destination,
      })
    );
  }

  async findByOperatorId(operatorId: string): Promise<Schedule[]> {
    const operatorObjectId = new ObjectId(operatorId);
    
    const scheduleDocs = await Schedules.aggregate([
      { $match: { Operator_Id: operatorObjectId } },
      {
        $lookup: {
          from: "buses",
          localField: "Bus_Id",
          foreignField: "_id",
          as: "busDetails",
        },
      },
      {
        $lookup: {
          from: "routes",
          localField: "Route_Id",
          foreignField: "_id",
          as: "routeDetails",
        },
      },
      { $unwind: "$busDetails" },
      { $unwind: "$routeDetails" },
    ]).exec();
  
    return scheduleDocs.map((doc) =>
      this.mapToEntity({
        ...doc,
        busName: doc.busDetails?.Name,
        routeSource: doc.routeDetails?.Source,
        routeDestination: doc.routeDetails?.Destination,
      })
    );
  }
  

  async updateSchedule(scheduleId: string, schedule: Partial<Schedule>): Promise<boolean> {
    const updatedSchedule = await Schedules.findByIdAndUpdate(
      scheduleId,
      { $set: schedule},
      { new: true } 
    ).exec();

    return !!updatedSchedule; 

  }

 
  async deleteSchedule(scheduleId: string): Promise<boolean> {
    const result = await Schedules.findByIdAndDelete(scheduleId).exec();
    return !!result; 
  }

  async getBusIdByScheduleId(scheduleId: string): Promise<string | null> {
    const schedule = await Schedules.findById(scheduleId)
      .select('Bus_Id')
      .exec();
    
    return schedule?.Bus_Id?.toString() || null;
  }

  async getScheduleIdsByOwnerId(ownerId: string): Promise<string[]> {
    const ownerObjectId = new ObjectId(ownerId);
    const schedules = await Schedules.find({ OwnerId: ownerObjectId })
      .select("_id") // Select only the `_id` field
      .exec();
  
    return schedules.map((schedule) => schedule._id.toString());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(scheduleDoc: any ): Schedule {
    return new Schedule(
      scheduleDoc._id?.toString() || "",
      scheduleDoc.Price,
      scheduleDoc.OwnerId?.toString() || "",
      scheduleDoc.Operator_Id?.toString() || "",
      scheduleDoc.Bus_Id?.toString() || "",
      scheduleDoc.Route_Id?.toString() || "",
      scheduleDoc.dateSlots || [],
      scheduleDoc.startTime || "",
      scheduleDoc.endTime || "",
      scheduleDoc.status || "Scheduled",
      scheduleDoc.isActive
    );
  }
}
