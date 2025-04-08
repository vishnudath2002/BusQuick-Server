import { Route } from "../entities/Route";

export interface IRouteRepository {
  save(route: Route): Promise<boolean>;
  findById(routeId: string): Promise<Route | null>;
  findBySourceAndDestination(source: string, destination: string): Promise<Route | null>;
  getRoutesByOwnerId(ownerId: string): Promise<Route[]>;
  searchDestinations(query: string): Promise<string[]>;
  searchSources(query: string): Promise<string[]>;
  deleteRoute(routeId: string): Promise<boolean>;
  updateRoute(routeId: string,updateData:Partial<Route>): Promise<boolean>;
  addDropStops(routeId: string, dropStops: string[]): Promise<boolean>;
  addPickupStops(routeId: string, pickupStops: string[]): Promise<boolean>;

}
