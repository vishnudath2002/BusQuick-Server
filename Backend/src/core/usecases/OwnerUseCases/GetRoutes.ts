import { IRouteRepository } from "../../interfaces/IRouteRepository";
import { Route } from "../../entities/Route";



interface GetRoutesResponse {
    success: boolean;
    message: string;
    routes?: Route[];
}

export class GetRoutes {
    constructor(private routeRepository: IRouteRepository) {}

    async execute(ownerId: string): Promise<GetRoutesResponse> {
        const routes = await this.routeRepository.getRoutesByOwnerId(ownerId);
        if (routes.length === 0) {
            return {success: false, message: "No routes found for the given owner ID", routes: []};
        }
        return {success: true, message: "Routes found", routes: routes};
    }
}