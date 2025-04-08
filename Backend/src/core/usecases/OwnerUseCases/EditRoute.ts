import { IRouteRepository } from "../../interfaces/IRouteRepository";
import { Route } from "../../entities/Route";


export class EditRoute {
    constructor(private routeRepository: IRouteRepository){}

    async execute(routeId: string, updateData: Partial<Route>){
        const result = await this.routeRepository.updateRoute(routeId,updateData);
        if(!result){
            return {success: false, message: "Route not Edited",data:null}
        }
        return {success: true, message: "Route Edited",data:result}
    }
    
}