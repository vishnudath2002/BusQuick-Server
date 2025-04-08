import { Request, Response } from 'express';
import { AddRoute } from "../../core/usecases/OwnerUseCases/AddRoute";
import { AddBus } from "../../core/usecases/OwnerUseCases/AddBus";
import { AddSchedule } from "../../core/usecases/OwnerUseCases/AddSchedule";
import { GetBuses } from "../../core/usecases/OwnerUseCases/GetBuses";
import { GetRoutes } from "../../core/usecases/OwnerUseCases/GetRoutes";
import { GetSchedule } from "../../core/usecases/OwnerUseCases/GetSchedule";
import { AddSeats } from '../../core/usecases/OwnerUseCases/AddSeats';
import { SetSeats } from '../../core/usecases/OwnerUseCases/setSeats';
import { EditBus } from '../../core/usecases/OwnerUseCases/EditBus';
import { DeleteBus } from '../../core/usecases/OwnerUseCases/DeleteBus';
import { EditRoute } from '../../core/usecases/OwnerUseCases/EditRoute';
import { DeleteRoute } from '../../core/usecases/OwnerUseCases/DeleteRoute';
import { EditSchedule } from '../../core/usecases/OwnerUseCases/EditSchedule';
import { DeleteSchedule } from '../../core/usecases/OwnerUseCases/DeleteSchedule';
import { GetBookings } from '../../core/usecases/OwnerUseCases/GetBookings';
import { GetOperators } from '../../core/usecases/OwnerUseCases/GetOperators';
import { AddRc } from '../../core/usecases/OwnerUseCases/AddRc';
import { AddDropStops } from '../../core/usecases/OwnerUseCases/AddDropStops';
import { AddPickupStops } from '../../core/usecases/OwnerUseCases/AddPickupStops';
import { CreateLayout } from '../../core/usecases/OwnerUseCases/CreateLayout';
import { UpdateLayout } from '../../core/usecases/OwnerUseCases/UpdateLayout ';
import { DeleteLayout } from '../../core/usecases/OwnerUseCases/DeleteLayout';
import { GetLayout } from '../../core/usecases/OwnerUseCases/GetLayout';



export class OwnerController {
  constructor(
    private _addBus: AddBus,
    private _addRoute: AddRoute,
    private _addSchedule: AddSchedule,
    private _getBuses: GetBuses,
    private _getRoutes: GetRoutes,
    private _getSchedule: GetSchedule,
    private _addSeats: AddSeats,
    private _setSeats: SetSeats,
    private _editBus: EditBus,
    private _deleteBus: DeleteBus,
    private _editRoute: EditRoute,
    private _deleteRoute: DeleteRoute,
    private _editSchedule: EditSchedule,
    private _deleteSchedule: DeleteSchedule,
    private _getBookings: GetBookings,
    private _getOperator: GetOperators,
    private _addRc: AddRc,
    private _addDropStops: AddDropStops,
    private _addPickupStops: AddPickupStops,
    private _createLayout: CreateLayout,
    private _updateLayout: UpdateLayout,
    private _deleteLayout: DeleteLayout,
    private _getLayout: GetLayout
  ) {}

  async createBus(req: Request, res: Response) {
    const { bus } = req.body;
    const result = await this._addBus.execute(bus);
    res.status(200).json(result);
  }

  async getBusByOwnerId(req: Request, res: Response) {
    const { ownerId } = req.params;
    const result = await this._getBuses.execute(ownerId);
    res.status(200).json(result);
  }

  async createRoute(req: Request, res: Response) {
    const { route } = req.body;
    const result = await this._addRoute.execute(route);
    res.status(200).json(result);
  }

  async getRouteByOwnerId(req: Request, res: Response) {
    const { ownerId } = req.params;
    const result = await this._getRoutes.execute(ownerId);
    res.status(200).json(result);
  }

  async createSchedule(req: Request, res: Response) {
    const { schedule } = req.body;
    const result = await this._addSchedule.execute(schedule);
    res.status(200).json(result);
  }

  async getScheduleByOwnerId(req: Request, res: Response) {
    const { ownerId } = req.params;
    const result = await this._getSchedule.execute(ownerId);
    res.status(200).json(result);
  }

  async createSeats(req: Request, res: Response) {
    const { busId, seatCount, rowLabel } = req.body;
    const result = await this._addSeats.execute(busId, seatCount, rowLabel);
    res.status(200).json(result);
  }

  async setupSeats(req: Request, res: Response) {

    const { busId, scheduleId, availability } = req.body;
    const result = await this._setSeats.execute(busId, scheduleId, availability);
    res.status(200).json(result);

  }

  async updateBus(req: Request, res: Response){
    const { busId , updateData } = req.body;
    const result = await this._editBus.execute(busId,updateData);
    res.status(200).json(result);
  }

  async removeBus(req: Request, res: Response){
    const { busId } = req.body;
    const result = await this._deleteBus.execute(busId);
    res.status(200).json(result);
  }

  async updateRoute(req: Request,res: Response){
    const { routeId , updateData } = req.body;
    const result = await this._editRoute.execute(routeId,updateData);
    res.status(200).json(result);
  }
  
  async removeRoute(req: Request, res: Response){
    const { routeId } = req.body;
    const result = await this._deleteRoute.execute(routeId);
    res.status(200).json(result);
  }


  async updateSchedule(req: Request,res: Response){
    const { scheduleId , updateData } = req.body;
    const result = await this._editSchedule.execute(scheduleId,updateData);
    res.status(200).json(result);
  }

  
  async removeSchedule(req: Request, res: Response){
    const { scheduleId } = req.body;
    const result = await this._deleteSchedule.execute(scheduleId);
    res.status(200).json(result);
  }

  async fetchBookings(req: Request, res: Response) {
    const { ownerId } = req.params;
    const result = await this._getBookings.execute(ownerId);
    res.status(200).json(result);
  }

  async fetchOperators(req: Request, res: Response){
    const result = await this._getOperator.execute();
    res.status(200).json(result)
  }

  async uploadPhoto(req: Request, res: Response): Promise<void> {

    if (!req.file) {
        res.status(404).json({ message: "File not found" });
        return;
    }

    const { busId } = req.body;

    try {
        const fileBuffer = req.file?.buffer; // Extract buffer from Multer's file object

        console.log("Received File Buffer:", fileBuffer); // Debugging output

        if (!fileBuffer) {
            res.status(400).json({ message: "Invalid file buffer" });
            return;
        }

        const result = await this._addRc.execute(busId, fileBuffer);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error uploading RC:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  }


   async  moreDropStops(req: Request, res: Response) {
    try {
      const { routeId, dropStops } = req.body;
  
      if (!routeId) {
        res.status(400).json({ success: false, message: "Route ID is required." });
      }
      if (!Array.isArray(dropStops) || dropStops.length === 0) {
         res.status(400).json({ success: false, message: "Drop stops array cannot be empty." });
      }
  
      const success = await this._addDropStops.execute(routeId, dropStops);
  
      if (success) {
         res.status(200).json({ success: true, message: "Drop stops added successfully." });
      } else {
         res.status(500).json({ success: false, message: "Failed to add drop stops." });
      }
    } catch (error) {
      console.error("Error adding drop stops:", error);
       res.status(500).json({ success: false, message: "Internal server error." });
    }
  }

  async  morePickupStops(req: Request, res: Response) {
    try {
      const { routeId, pickupStops } = req.body;
  
      if (!routeId) {
        res.status(400).json({ success: false, message: "Route ID is required." });
      }
      if (!Array.isArray(pickupStops) || pickupStops.length === 0) {
         res.status(400).json({ success: false, message: "pickup Stops array cannot be empty." });
      }
  
      const success = await this._addPickupStops.execute(routeId, pickupStops);
  
      if (success) {
         res.status(200).json({ success: true, message: "pickup Stops added successfully." });
      } else {
         res.status(500).json({ success: false, message: "Failed to add pickup Stops." });
      }
    } catch (error) {
      console.error("Error adding drop stops:", error);
       res.status(500).json({ success: false, message: "Internal server error." });
    }
  }

  async generateLayout (req: Request, res: Response){
    try {
      const { rows, columnConfig, busId } = req.body;
      const layout = await this._createLayout.execute({ rows, columnConfig,  busId });
      res.status(201).json(layout);
    }catch (error) {
      console.error("Error while create layout:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
   }
  };




  async editLayout(req: Request, res: Response) {
    try {
      const { layoutId, updateData } = req.body;
      const result = await this._updateLayout.execute(layoutId, updateData);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating layout:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }


  async removeLayout(req: Request, res: Response) {
    try {
      const { busId } = req.body;
      const result = await this._deleteLayout.execute(busId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting layout:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async showLayout(req: Request, res: Response) {
    try {
      const { busId } = req.params;
      const result = await this._getLayout.execute(busId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching layout:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  

}
