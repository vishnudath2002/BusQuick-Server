import { IRouteRepository } from "../../interfaces/IRouteRepository";

export class AddDropStops {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(routeId: string, dropStops: string[]): Promise<boolean> {


    const result = await this.routeRepository.addDropStops(routeId, dropStops);
    return result;
  }
}
