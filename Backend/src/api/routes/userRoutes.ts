import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import  upload from "../middlewares/upload"
import { UserController } from "../controllers/UserController";

import { RouteRepository } from "../infrastructure/repositories/RouteRepository";
import { ScheduleRepository } from "../infrastructure/repositories/ScheduleRepository";
import { BusRepository } from "../infrastructure/repositories/BusRepository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { SeatRepository } from "../infrastructure/repositories/SeatRepository";
import { BookingRepository } from "../infrastructure/repositories/BookingRepository";
import { PaymentRepository } from "../infrastructure/repositories/PaymentRepository";
import { WalletRepository } from "../infrastructure/repositories/WalletRepository";



import { EditName } from "../../core/usecases/userUseCase/EditName";
import { EditEmail } from "../../core/usecases/userUseCase/EditEmail";
import { EditPhone } from "../../core/usecases/userUseCase/EditPhone";
import { BrowseBus } from "../../core/usecases/userUseCase/BrowseBus";
import { ShowProfile } from "../../core/usecases/userUseCase/ShowProfile";
import { searchDest } from "../../core/usecases/userUseCase/SearchDest";
import { searchSour } from "../../core/usecases/userUseCase/SearchSour";
import { ShowSeats } from "../../core/usecases/userUseCase/ShowSeats";
import { BookSeats } from "../../core/usecases/userUseCase/BookSeats";
import { PayAmount } from "../../core/usecases/userUseCase/PayAmount";
import { Checkout } from "../../core/usecases/userUseCase/Checkout";
import { PaymentService } from "../../core/services/PaymentService";
import { ChangeBookStatus } from "../../core/usecases/userUseCase/ChangeBookStatus";
import { AlterSeatStatus } from "../../core/usecases/userUseCase/AlterSeatStatus";
import { ShowBooking } from "../../core/usecases/userUseCase/showBooking";
import { EditPassword } from "../../core/usecases/userUseCase/EditPassword";
import { EditBooking } from "../../core/usecases/userUseCase/EditBooking";
import { BusIdBySchedule } from "../../core/usecases/userUseCase/BusIdBySchedule";
import { UploadProfilePicture } from "../../core/usecases/userUseCase/UploadProfilePicture";
import { CloudinaryService } from "../../core/services/CloudinaryService";
import { CreateWallet } from "../../core/usecases/userUseCase/CreateWallet";
import { ShowWallet } from "../../core/usecases/userUseCase/ShowWallet";
import { AddMoney } from "../../core/usecases/userUseCase/AddMoney";
import { WithdrawMoney } from "../../core/usecases/userUseCase/WithdrawMoney";
import { GetSeatsByIds } from "../../core/usecases/userUseCase/GetSeatsByIds";
import { CancelTickets } from "../../core/usecases/userUseCase/CancelTickets";



const router = express.Router();

const routeRepository = new RouteRepository();
const scheduleRepository = new ScheduleRepository();
const busRepository = new BusRepository();
const userRepository = new UserRepository();
const seatRepository = new SeatRepository();
const bookingRepository = new BookingRepository();
const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService()
const cloudinaryService = new CloudinaryService();
const uploadProfilePhotoUseCase = new UploadProfilePicture(userRepository, cloudinaryService);
const walletRepository = new WalletRepository();
const userController = new UserController(
new BrowseBus(routeRepository,scheduleRepository,busRepository,seatRepository),
new ShowProfile(userRepository),
new EditName(userRepository),
new EditEmail(userRepository),
new EditPhone(userRepository),
new searchDest(routeRepository),
new searchSour(routeRepository),
new ShowSeats(seatRepository),
new BookSeats(bookingRepository,seatRepository),
new PayAmount(paymentRepository),
new Checkout(paymentService),
new AlterSeatStatus(seatRepository),
new ChangeBookStatus(bookingRepository),
new ShowBooking(bookingRepository),
new EditPassword(userRepository),
new EditBooking(bookingRepository),
new BusIdBySchedule(scheduleRepository),
cloudinaryService,  
uploadProfilePhotoUseCase,
new CreateWallet(walletRepository), 
new AddMoney(walletRepository),     
new WithdrawMoney(walletRepository), 
new ShowWallet(walletRepository) ,
new GetSeatsByIds(seatRepository),
new CancelTickets(
    new BookingRepository,
    new SeatRepository,
    new WalletRepository)
);


router.get("/profile", authMiddleware,userController.getUserDetail.bind(userController));

router.put("/profile/editName", authMiddleware, userController.editName.bind(userController));

router.put("/profile/editEmail", authMiddleware, userController.editEmail.bind(userController));

router.put("/profile/editPhone", authMiddleware, userController.editPhone.bind(userController));

router.put("/profile/editPassword", authMiddleware, userController.editPassword.bind(userController));

router.post("/profile/editphoto", upload.single("profilePicture"), userController.uploadProfilePicture);

router.post("/buses/location"  ,authMiddleware, userController.getByLocation.bind(userController));

router.get("/searchDest", authMiddleware, userController.searchDestinations.bind(userController))

router.get("/searchSour", authMiddleware, userController.searchSoures.bind(userController));

router.post("/seats", authMiddleware, userController.getSeats.bind(userController))

router.post("/booking", authMiddleware, userController.bookTheSeats.bind(userController))

router.post("/checkout", authMiddleware, userController.checkoutPayment.bind(userController))

router.post("/payment", authMiddleware, userController.payPrice.bind(userController));
//
router.post("/updateBook", authMiddleware, userController.changeBookStatus.bind(userController));
//
router.post("/getbusid", authMiddleware, userController.getBusId.bind(userController));
//
router.post("/updateSeat", authMiddleware, userController.changeSeatStatus.bind(userController));

router.get("/bookings", authMiddleware , userController.fetchBookings.bind(userController));
//
router.put("/updatebooking", authMiddleware, userController.editBooking.bind(userController));

router.post("/createwallet", authMiddleware, userController.setWallet.bind(userController));

router.get("/wallet", authMiddleware , userController.getWallet.bind(userController));

router.post("/addmoney", authMiddleware, userController.creditMoney.bind(userController));

router.post("/takemoney", authMiddleware, userController.debitMoney.bind(userController))

router.post("/getseatbyids", authMiddleware, userController.getSeatNumbers.bind(userController))

router.delete("/deletebookedseats", authMiddleware, userController.deleteSeatsFromBooking.bind(userController))






export default router;
