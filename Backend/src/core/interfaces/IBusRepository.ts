import { Bus } from "../entities/Bus";
import { Types } from "mongoose";

export interface IBusRepository {
  addBus(bus: Bus): Promise<Bus | null>;
  getBusByOwnerId(ownerId: Types.ObjectId): Promise<Bus[]>;
  findById(busId: string): Promise<Bus | null>;
  updateBus(busId: string, updateData: Partial<Bus>): Promise<Bus | null>
  deleteBus(busId: string): Promise<boolean>;
  // findByLocation(source: string, destination: string): Promise<Bus[]>;
  // findByTiming(departure: string, arrival: string): Promise<Bus[]>;
  // update(bus: Bus): Promise<void>;
  // delete(busId: string): Promise<void>;
}
