import { Bus } from "../../entities/Bus";
import { IBusRepository } from "../../interfaces/IBusRepository";
import { Types } from "mongoose";

interface GetBusesResponse {
  success: boolean;
  message: string;
  buses?: Bus[];
}

export class GetBuses {
  constructor(private busRepository: IBusRepository) {}

  async execute(ownerId: string): Promise<GetBusesResponse> {
    const buses = await this.busRepository.getBusByOwnerId(new Types.ObjectId(ownerId));
    if (buses.length === 0) {
        return {success: false, message: "No buses found for the given owner ID", buses: []};
    }
    return {success: true, message: "Buses found", buses: buses};
  }     
}   