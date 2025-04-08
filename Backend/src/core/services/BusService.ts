import { BusRepository } from '../../api/infrastructure/repositories/BusRepository';

export class BusService {
  constructor(private busesRepository: BusRepository) {}

  async exploreByLocation(source: string, destination: string) {
    return await this.busesRepository.findByLocation(source, destination);
  }

//   async exploreByRoute(routeId: string) {
//     return await this.busesRepository.findByRoute(routeId);
//   }

  async exploreByTiming(arrival: string, departure: string) {
    return await this.busesRepository.findByTiming(arrival, departure);
  }
}
