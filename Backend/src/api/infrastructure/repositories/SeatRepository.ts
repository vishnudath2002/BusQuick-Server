import { ISeatRepository } from "../../../core/interfaces/ISeatRepository";
import { Seat } from "../../../core/entities/Seat";
import Seats from "../db/models/Seats";
import Schedules from "../db/models/Schedules";
import { IBuses } from "../db/models/Buses";

export class SeatRepository implements ISeatRepository {
  async addSeats(busId: string, seatCount: number, rowLabel: string): Promise<boolean> {
    try {
      const existingSeats = await Seats.findOne({ BusId: busId });
      if (existingSeats) {
        console.log(`Seats already exist for busId: ${busId}`);
        return false;
      }

      const seats = Array.from({ length: seatCount }, (_, index) => ({
        SeatNumber: `${rowLabel}${(index + 1).toString().padStart(2, "0")}`,
        BusId: busId,
        availability: [],
      }));

      const result = await Seats.insertMany(seats);
      return result.length === seatCount;
    } catch (error) {
      console.error("Error adding seats:", error);
      return false;
    }
  }

  async getSeats(busId: string, date: string): Promise<Seat[]> {
    try {
      console.log("date",date)
      const seats = await Seats.find({ BusId: busId });

      return seats.map((seat) => new Seat(
        seat.BusId.toString(),
        seat.SeatNumber,
        seat.availability
          .filter((av) => new Date(av.date).toISOString().split("T")[0] === date) // Filter by date
          .map((av) => ({
            date: av.date,
            isAvailable: av.isAvailable,
            scheduleId: av.scheduleId.toString(),
          }))
      ));
    } catch (error) {
      console.error("Error fetching seats:", error);
      return [];
    }
  }

  async setSeats(busId: string, scheduleId: string, availability: { date: Date; isAvailable: boolean }[]): Promise<boolean> {
    try {
      const updateResult = await Seats.updateMany(
        { BusId: busId },
        { $push: { availability: { $each: availability.map((a) => ({ ...a, scheduleId })) } } }
      );
      return updateResult.modifiedCount > 0;
    } catch (error) {
      console.error("Error setting seat availability:", error);
      return false;
    }
  }

  async getAvailableSeatsByDate(busId: string, date: string, scheduleId: string): Promise<number> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
  
      
      const availableSeatsCount = await Seats.countDocuments({
        BusId: busId,
        availability: {
          $elemMatch: {
            date: { $gte: startOfDay, $lt: endOfDay }, 
            isAvailable: true, 
            scheduleId: scheduleId 
          }
        }
      });
  
    
     
      return availableSeatsCount;
    } catch (error) {
      console.error("Error fetching available seats:", error);
      return 0;
    }
  }

  async getIdsByNameScheduleId(names: string[], scheduleId: string): Promise<string[]> {
    try {

      const seats = await Seats.find(
        {
          SeatNumber: { $in: names }, // Find seats matching any of the given numbers
          availability: {
            $elemMatch: { scheduleId: scheduleId }
          }
        },
        { _id: 1 }
      );
  
      return seats.map(seat => seat._id.toString()); // Convert ObjectId to string
    } catch (error) {
      console.error("Error fetching seat IDs by name and scheduleId:", error);
      return [];
    }
  }

  async updateSeatAvailability(busId: string, date: string, seatNumbers: string[], scheduleId: string, isAvailable: boolean): Promise<boolean> {
    try {
      console.log("sestr",busId, date , seatNumbers , scheduleId , isAvailable)
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
    
      const updateResult = await Seats.updateMany(
        {
          BusId: busId,
          SeatNumber: { $in: seatNumbers },
        },
        {
          $set: { "availability.$[elem].isAvailable": isAvailable }
        },
        {
          arrayFilters: [
            {
              "elem.scheduleId": scheduleId,
              "elem.date": { $gte: startOfDay, $lt: endOfDay }
            }
          ]
        }
      );

 
      console.log(updateResult)
      return updateResult.modifiedCount > 0;

    } catch (error) {
      console.error("Error updating seat availability:", error);
      return false;
    }
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async  getSeatsByScheduleId(scheduleId: string, operatorId: string, date: string): Promise<any> {
    try {
      
      const schedule = await Schedules.findOne({ _id: scheduleId, Operator_Id: operatorId })
        .populate<{ Bus_Id: IBuses }>("Bus_Id"); 
      if (!schedule || !schedule.Bus_Id) {
        console.error("Schedule not found or Bus not populated.");
        return null;
      }
  
      const bus: IBuses = schedule.Bus_Id; 
  
      // Fetch seats for the bus
      const seats = await Seats.find({ BusId: bus._id });
  
     
      const seatData = seats.map((seat) => ({
        SeatNumber: seat.SeatNumber,
        availability: seat.availability
          .filter((av) => new Date(av.date).toISOString().split("T")[0] === date)
          .map((av) => ({
            date: av.date,
            isAvailable: av.isAvailable,
            scheduleId: av.scheduleId.toString(),
          })),
      }));
  
      return {
        busId: bus._id,
        busName: bus.Name,
        seats: seatData,
      };
    } catch (error) {
      console.error("Error fetching seats by schedule ID:", error);
      return null;
    }
  }


  async getSeatNumbersByIds(seatIds: string[]): Promise<string[]> {
    const seatDocs = await Seats.find({ _id: { $in: seatIds } }).select("SeatNumber");
    return seatDocs.map(seat => seat.SeatNumber);
  }
  

  async getSeatIdsByNumbers(seatNumbers: string[], busId: string): Promise<string[]> {
    try {
      const seats = await Seats.find({ 
        SeatNumber: { $in: seatNumbers }, 
        BusId: busId 
      }).select("_id");
      
      return seats.map(seat => seat._id.toString());
    } catch (error) {
      console.error("Error fetching seat IDs by seat numbers:", error);
      return [];
    }
  }
  
  
  

}
