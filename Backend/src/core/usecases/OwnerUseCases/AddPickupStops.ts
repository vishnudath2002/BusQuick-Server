import { IRouteRepository } from "../../interfaces/IRouteRepository";

export class AddPickupStops {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(routeId: string, pickupStops: string[]): Promise<boolean> {

    const result = await this.routeRepository.addPickupStops(routeId, pickupStops);
    return result;
    
  }

}
