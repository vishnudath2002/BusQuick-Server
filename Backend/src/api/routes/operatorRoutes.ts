import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware";

import { OperatorController } from "../controllers/OperatorController"
import { ShowBookings } from "../../core/usecases/operatorUseCase/ShowBookings";
import { ShowSchedules } from "../../core/usecases/operatorUseCase/ShowSchedules";
import { BookingRepository } from "../infrastructure/repositories/BookingRepository";
import { ScheduleRepository } from "../infrastructure/repositories/ScheduleRepository";
import { ShowSeats } from "../../core/usecases/operatorUseCase/ShowSeats";
import { SeatRepository } from "../infrastructure/repositories/SeatRepository";
import { CancelSeats } from "../../core/usecases/operatorUseCase/CancelSeats";
import { EmailService } from "../../core/services/EmailService";
import { WalletRepository } from "../infrastructure/repositories/WalletRepository";


const router = express.Router();


const operatorController = new OperatorController(
 new ShowBookings(new BookingRepository),
 new ShowSchedules(new ScheduleRepository),
 new ShowSeats(new SeatRepository),
 new CancelSeats(
    new BookingRepository,
    new SeatRepository,
    new EmailService,
    new WalletRepository
)
)

router.get("/getbookings/:operatorId",authMiddleware,operatorController.fetchBookings.bind(operatorController))

router.get("/getSchedules/:operatorId",authMiddleware,operatorController.fetchSchedules.bind(operatorController))

router.get("/getSeats", authMiddleware, operatorController.fetchSeats.bind(operatorController))

router.post("/deletebookedseats", authMiddleware, operatorController.deleteSeatsFromBooking.bind(operatorController))

export default router;