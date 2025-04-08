import { IRouteRepository } from "../../interfaces/IRouteRepository";
import { Route } from "../../entities/Route";


export class AddRoute {
    constructor(private routeRepository: IRouteRepository) {}

    async execute(route: Route) {
        const result = await this.routeRepository.save(route);
        if(!result){
            return {success: false, message: "Route not added because it already exists"}
        }
        return {success: true, message: "Route added"}
    }
}       