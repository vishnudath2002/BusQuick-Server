import { IRouteRepository } from "../../../core/interfaces/IRouteRepository";
import { Route } from "../../../core/entities/Route";
import Routes from "../db/models/Route"; // Import the Mongoose model for Route

export class RouteRepository implements IRouteRepository {
  async save(route: Route): Promise<boolean> {
    const existingRoute = await Routes.findOne({ 
      OwnerId: route.ownerId,
      Source: route.source,
      Destination: route.destination
    });
    if (existingRoute) {
      return false;  // Route already 
    }

    const routeToSave = new Routes({
      OwnerId: route.ownerId,
      Source: route.source,
      Destination: route.destination,
      PickupStops: route.pickupStops,
      DropStops: route.dropStops,
      Distance: route.distance,
      CreatedAt: route.createdAt,
      EstimatedTime: route.estimatedTime,
      UpdatedAt: route.updatedAt,
    });
    await routeToSave.save();
    return true;
  }

  async findById(routeId: string): Promise<Route | null> {
    const routeDoc = await Routes.findById(routeId).exec();
    if (!routeDoc) return null;

    return new Route(
      routeDoc._id?.toString() || '',
      routeDoc.OwnerId?.toString() || '',
      routeDoc.Source,
      routeDoc.Destination,
      routeDoc.DropStops,
      routeDoc.PickupStops,
      routeDoc.Distance,
      routeDoc.CreatedAt,
      routeDoc.EstimatedTime,
      routeDoc.UpdatedAt
    );
  }

  async findBySourceAndDestination(source: string, destination: string): Promise<Route | null> {
   
    const routeDoc = await Routes.findOne({ Source: source, Destination: destination }).exec();
    if (!routeDoc) return null;

    return new Route(
      routeDoc._id?.toString() || '',
      routeDoc.OwnerId?.toString() || '',
      routeDoc.Source,
      routeDoc.Destination,
      routeDoc.DropStops,
      routeDoc.PickupStops,
      routeDoc.Distance,
      routeDoc.CreatedAt,
      routeDoc.EstimatedTime,
      routeDoc.UpdatedAt
    );
  }

  async getRoutesByOwnerId(ownerId: string): Promise<Route[]> {
    const routes = await Routes.find({ OwnerId: ownerId }).exec();
    return routes.map(route => new Route(
      route._id?.toString() || '',
      route.OwnerId?.toString() || '',
      route.Source,
      route.Destination,
      route.DropStops,
      route.PickupStops,
      route.Distance,
      route.CreatedAt,
      route.EstimatedTime,
      route.UpdatedAt
    ));
  }

  async searchDestinations(query: string): Promise<string[]> {
    if (!query) {
      throw new Error("Query parameter is required");
    }

    const destinations = await Routes.find(
      { Destination: { $regex: `^${query}`, $options: "i" } },
      { Destination: 1, _id: 0 } 
    ).limit(5);

    const uniqueDestinations = [...new Set(destinations.map(dest => dest.Destination))];
    return uniqueDestinations;
  }

  async searchSources(query: string): Promise<string[]> {
    if (!query) {
      throw new Error("Query parameter is required");
    }

    const sources = await Routes.find(
      { Source: { $regex: `^${query}`, $options: "i" } },
      { Source: 1, _id: 0 } 
    ).limit(5);

    const uniqueSources = [...new Set(sources.map(sour => sour.Source))];
    return uniqueSources;
  }


  async deleteRoute(routeId: string): Promise<boolean> {
    const deletedRoute = await Routes.findByIdAndDelete(routeId).exec();
    return !!deletedRoute;
  }

  async updateRoute(routeId: string, updateData: Partial<Route>): Promise<boolean> {
    const updatedRoute = await Routes.findByIdAndUpdate(routeId, updateData, { new: true }).exec();
    return !!updatedRoute;
  }

  async addDropStops(routeId: string, dropStops: string[]): Promise<boolean> {
    if (!dropStops.length) {
      throw new Error("Drop stops array cannot be empty.");
    }
  
    const updatedRoute = await Routes.findByIdAndUpdate(
      routeId,
      { $set: { DropStops: dropStops } },  
      { new: true }
    ).exec();
  
  
    return !!updatedRoute;
  }
  
  async addPickupStops(routeId: string, pickupStops: string[]): Promise<boolean> {
    if (!pickupStops.length) {
      throw new Error("Drop stops array cannot be empty.");
    }
  
    const updatedRoute = await Routes.findByIdAndUpdate(
      routeId,
      { $set: { PickupStops: pickupStops } },  
      { new: true }
    ).exec();
  
  
    return !!updatedRoute;
  }


}
