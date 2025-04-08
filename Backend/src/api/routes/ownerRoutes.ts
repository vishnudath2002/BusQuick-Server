import express from "express";

import { OwnerController } from "../controllers/OwnerController";
import { authMiddleware } from "../middlewares/authMiddleware";

import uploadRc from "../middlewares/uploadRc";


import { SeatRepository } from "../infrastructure/repositories/SeatRepository";
import { BusRepository } from "../infrastructure/repositories/BusRepository";
import { RouteRepository } from "../infrastructure/repositories/RouteRepository";
import { BookingRepository } from "../infrastructure/repositories/BookingRepository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { ScheduleRepository } from "../infrastructure/repositories/ScheduleRepository";
import { LayoutRepository } from "../infrastructure/repositories/LayoutRepository";



import { AddBus } from "../../core/usecases/OwnerUseCases/AddBus";
import { AddRoute } from "../../core/usecases/OwnerUseCases/AddRoute";
import { AddSchedule } from "../../core/usecases/OwnerUseCases/AddSchedule";
//import { BrowseBus } from "../../core/usecases/BrowseBus";
import { GetBuses } from "../../core/usecases/OwnerUseCases/GetBuses";
import { GetRoutes } from "../../core/usecases/OwnerUseCases/GetRoutes";
import { GetSchedule } from "../../core/usecases/OwnerUseCases/GetSchedule";
import { AddSeats } from "../../core/usecases/OwnerUseCases/AddSeats";
import { SetSeats } from "../../core/usecases/OwnerUseCases/setSeats";
import { EditBus } from "../../core/usecases/OwnerUseCases/EditBus";
import { DeleteBus } from "../../core/usecases/OwnerUseCases/DeleteBus";
import { EditRoute } from "../../core/usecases/OwnerUseCases/EditRoute";
import { DeleteRoute } from "../../core/usecases/OwnerUseCases/DeleteRoute";
import { EditSchedule } from "../../core/usecases/OwnerUseCases/EditSchedule";
import { DeleteSchedule } from "../../core/usecases/OwnerUseCases/DeleteSchedule";
import { GetBookings  } from "../../core/usecases/OwnerUseCases/GetBookings";
import { GetOperators } from "../../core/usecases/OwnerUseCases/GetOperators";
import { AddRc } from "../../core/usecases/OwnerUseCases/AddRc";
import { AddDropStops } from "../../core/usecases/OwnerUseCases/AddDropStops";
import { AddPickupStops } from "../../core/usecases/OwnerUseCases/AddPickupStops";
import { CreateLayout } from "../../core/usecases/OwnerUseCases/CreateLayout";
import { UpdateLayout } from "../../core/usecases/OwnerUseCases/UpdateLayout ";
import { DeleteLayout } from "../../core/usecases/OwnerUseCases/DeleteLayout";
import { GetLayout } from "../../core/usecases/OwnerUseCases/GetLayout";

const router = express.Router();


const ownerController = new OwnerController(
  new AddBus(new BusRepository()),
  new AddRoute(new RouteRepository()),
  new AddSchedule(new ScheduleRepository()),
  new GetBuses(new BusRepository()),
  new GetRoutes(new RouteRepository()),
  new GetSchedule(new ScheduleRepository()),
  new AddSeats(new SeatRepository()),
  new SetSeats(new SeatRepository()),
  new EditBus(new BusRepository()),
  new DeleteBus(new BusRepository()),
  new EditRoute(new RouteRepository()),
  new DeleteRoute(new RouteRepository()),
  new EditSchedule(new ScheduleRepository()),
  new DeleteSchedule(new ScheduleRepository()),
  new GetBookings(new ScheduleRepository(),new BookingRepository()),
  new GetOperators(new UserRepository()),
  new AddRc(new BusRepository()),
  new AddDropStops(new RouteRepository()),
  new AddPickupStops(new RouteRepository()),
  new CreateLayout(new LayoutRepository(), new BusRepository()),
  new UpdateLayout(new LayoutRepository()),
  new DeleteLayout(new LayoutRepository()),
  new GetLayout(new LayoutRepository())
);




router.post("/addBus", authMiddleware, ownerController.createBus.bind(ownerController));
router.post("/addRoute", authMiddleware, ownerController.createRoute.bind(ownerController));
router.post("/addSchedule", authMiddleware, ownerController.createSchedule.bind(ownerController));
router.post("/addSeats", authMiddleware, ownerController.createSeats.bind(ownerController));
router.post("/setSeats", authMiddleware, ownerController.setupSeats.bind(ownerController));
router.get("/getBuses/:ownerId", authMiddleware, ownerController.getBusByOwnerId.bind(ownerController));

router.get("/getRoutes/:ownerId", authMiddleware, ownerController.getRouteByOwnerId.bind(ownerController));
router.get("/getSchedules/:ownerId", authMiddleware, ownerController.getScheduleByOwnerId.bind(ownerController));
router.post("/editbus", authMiddleware, ownerController.updateBus.bind(ownerController));
router.post("/addrc", authMiddleware, uploadRc.single("file"), ownerController.uploadPhoto.bind(ownerController));
router.post("/deleteBus", authMiddleware, ownerController.removeBus.bind(ownerController));
router.post("/editroute", authMiddleware, ownerController.updateRoute.bind(ownerController));
router.post("/adddropStops",authMiddleware, ownerController.moreDropStops.bind(ownerController));
router.post("/addpickupStops", authMiddleware, ownerController.morePickupStops.bind(ownerController))
router.post("/deleteroute", authMiddleware, ownerController.removeRoute.bind(ownerController));

router.post("/editschedule", authMiddleware, ownerController.updateSchedule.bind(ownerController));
router.post("/deleteschedule", authMiddleware, ownerController.removeSchedule.bind(ownerController));
router.get("/getbookings/:ownerId", authMiddleware, ownerController.fetchBookings.bind(ownerController));
router.get("/getoperators", authMiddleware, ownerController.fetchOperators.bind(ownerController));

router.post("/addlayout", authMiddleware, ownerController.generateLayout.bind(ownerController))
router.get("/getlayout/:busId", authMiddleware, ownerController.showLayout.bind(ownerController));
router.patch("/editlayout", authMiddleware, ownerController.editLayout.bind(ownerController));
router.delete("/deletelayout", authMiddleware ,ownerController.removeLayout.bind(ownerController));







export default router;      