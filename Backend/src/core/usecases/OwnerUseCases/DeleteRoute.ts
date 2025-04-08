import { IRouteRepository } from "../../interfaces/IRouteRepository";

export class DeleteRoute {
    
    constructor(private routeRepository: IRouteRepository) {}

    async execute(busId: string){
        const result = await this.routeRepository.deleteRoute(busId);
        if(!result){
            return { success: false, message: " Route Not Deleted "}
        }
       return { success: true , message: " Route Deleted " };
    }

}


