import { IBusRepository } from "../../../core/interfaces/IBusRepository";
import { Bus } from "../../../core/entities/Bus";
import Buses from "../db/models/Buses";
import { Types } from "mongoose";

export class BusRepository implements IBusRepository {
 

 

  async findById(busId: string): Promise<Bus | null> {
    const busDoc = await Buses.findById(busId).exec();
    if (!busDoc) return null;
    
    return new Bus(
      busDoc._id.toString(),
      busDoc.OwnerId.toString(),

      busDoc.Name,
      busDoc.Status !== null ? busDoc.Status : "Inactive",

      busDoc.Type,
      busDoc.SeatsAvailable !== null ? busDoc.SeatsAvailable.toString() : "0",
      // busDoc.Amenities,
      busDoc.CreatedAt,
      busDoc.UpdatedAt,
      busDoc.SeatsTotal !== null ? busDoc.SeatsTotal : 0 ,
      busDoc.BusDoc !== null ? busDoc.BusDoc : null,
      busDoc.Ac !== null ? busDoc.Ac : null,
      
    );
  }


   async addBus(bus: Bus): Promise<Bus | null> {
    const existingBus = await Buses.findOne({ 
      OwnerId: bus.ownerId,
      Name: bus.name 
    });
    if (existingBus) {
      return null;  
    }
    const busToSave = new Buses({
      OwnerId: bus.ownerId,
      Name: bus.name,
      Status: bus.status,
      Type: bus.type,
      SeatsAvailable: bus.seatsAvailable,
      SeatsTotal: bus.seatsTotal,
      CreatedAt: bus.createdAt,
      UpdatedAt: bus.updatedAt,
      Ac:bus.ac,

    });
    const data = await busToSave.save();
    return {
        id: data._id.toString(),
        ownerId: data.OwnerId.toString(),
        name: data.Name,
        status: data.Status ?? "Inactive",
        type: data.Type,
        seatsAvailable: data.SeatsAvailable?.toString() ?? "0",
        seatsTotal: data.SeatsTotal ?? 0,
        createdAt: data.CreatedAt,
        updatedAt: data.UpdatedAt,
        busDoc: data.BusDoc,
        ac: data.Ac,
       
    };
   }

  async getBusByOwnerId(ownerId: Types.ObjectId): Promise<Bus[]> {
    const buses = await Buses.find({ OwnerId: ownerId }).exec();
    return buses.map(bus => new Bus(
      bus._id.toString(),
      bus.OwnerId.toString(),
      bus.Name,     
      bus.Status !== null ? bus.Status : "Inactive",
      bus.Type,   
      bus.SeatsAvailable !== null ? bus.SeatsAvailable.toString() : "0",
      bus.CreatedAt,  
      bus.UpdatedAt,  
      bus.SeatsTotal !== null ? bus.SeatsTotal : 0  ,
      bus.BusDoc !== null ? bus.BusDoc : null,
      bus.Ac !== null ? bus.Ac : null
    ));
  }


  async updateBus(busId: string, updateData: Partial<Bus>): Promise<Bus | null> {
    const updatedBus = await Buses.findByIdAndUpdate(busId,  { $set: updateData }, 
      { new: true, runValidators: true }).exec();
    if (!updatedBus) return null;

    return new Bus(
      updatedBus._id.toString(),
      updatedBus.OwnerId.toString(),
      updatedBus.Name,
      updatedBus.Status ?? "Inactive",
      updatedBus.Type,
      updatedBus.SeatsAvailable?.toString() ?? "0",
      updatedBus.CreatedAt,
      updatedBus.UpdatedAt,
      updatedBus.SeatsTotal ?? 0,
      updatedBus.BusDoc ?? null,
      updatedBus.Ac ?? null,
    );
  }

  async deleteBus(busId: string): Promise<boolean> {
    const result = await Buses.findByIdAndDelete(busId).exec();
    return result !== null;
  }

  // async findByLocation(source: string, destination: string): Promise<Bus[]> {
  //   // Logic for filtering buses based on source and destination.
  //   return this.buses.filter(
  //     bus => bus.timing && bus.timing.arrival === source && bus.timing.departure === destination
  //   );
  // }

  // async findByRoute(routeId: string): Promise<Bus[]> {
  //   // Logic for finding buses by routeId.
  //   return this.buses.filter(bus => bus.routeId === routeId); // Assuming buses have a `routeId` property.
  // }

  // async findByTiming(departure: string, arrival: string): Promise<Bus[]> {
  //   // Logic for filtering buses based on timing.
  //   return this.buses.filter(
  //     bus => bus.timing?.departure === departure && bus.timing?.arrival === arrival
  //   );
  // }

  // async update(bus: Bus): Promise<void> {
  //   const index = this.buses.findIndex(b => b.id === bus.id);
  //   if (index !== -1) {
  //     this.buses[index] = bus;
  //   }
  // }

  // async delete(busId: string): Promise<void> {
  //   this.buses = this.buses.filter(bus => bus.id !== busId);
  // }

 
}
