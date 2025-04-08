// import { Request, Response } from 'express';
// import { BrowseBus } from "../../core/usecases/userUseCase/BrowseBus"
// import { AddBus } from "../../core/usecases/OwnerUseCases/AddBus"


// export class BusController {
//   constructor(
//     private browseBus: BrowseBus,
//     private addBus: AddBus
//   ) {}

//   async getByLocation(req: Request, res: Response) {
//     const { source, destination } = req.body;
//     const serviceList = await this.browseBus.execute(source,destination)
//     res.status(200).json(serviceList);
//   }

//   async createBus(req: Request, res: Response) {
//     const { bus } = req.body;
//     const result = await this.addBus.execute(bus);
//     res.status(200).json(result);
//   }

// //   async getByRoute(req: Request, res: Response) {
// //     const { routeId } = req.query;
// //     const result = await this.busService.exploreByRoute(routeId as string);
// //     res.status(200).json(result);
// //   }

//   // async getByTiming(req: Request, res: Response) {
//   //   const { arrival, departure } = req.query;
//   //   const result = await this.busService.exploreByTiming(
//   //     arrival as string,
//   //     departure as string
//   //   );
//   //   res.status(200).json(result);
//   // }


// }
