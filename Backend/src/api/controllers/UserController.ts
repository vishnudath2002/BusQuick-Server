import { Request,  Response } from 'express';
import jwt from 'jsonwebtoken';

import { BrowseBus } from "../../core/usecases/userUseCase/BrowseBus";
import { ShowProfile } from '../../core/usecases/userUseCase/ShowProfile';
import { EditName } from '../../core/usecases/userUseCase/EditName';
import { EditEmail } from '../../core/usecases/userUseCase/EditEmail';
import { EditPhone } from '../../core/usecases/userUseCase/EditPhone';
import { EditPassword } from '../../core/usecases/userUseCase/EditPassword';
import { searchDest } from '../../core/usecases/userUseCase/SearchDest';
import { searchSour } from '../../core/usecases/userUseCase/SearchSour';
import { ShowSeats } from '../../core/usecases/userUseCase/ShowSeats';
import { BookSeats } from '../../core/usecases/userUseCase/BookSeats';
import { PayAmount } from '../../core/usecases/userUseCase/PayAmount';
import { Checkout } from '../../core/usecases/userUseCase/Checkout';
import { ShowBooking } from '../../core/usecases/userUseCase/showBooking';
import { EditBooking } from '../../core/usecases/userUseCase/EditBooking';
import { BusIdBySchedule } from '../../core/usecases/userUseCase/BusIdBySchedule';
import { UploadProfilePicture } from '../../core/usecases/userUseCase/UploadProfilePicture';
import { CreateWallet } from '../../core/usecases/userUseCase/CreateWallet';
import { WithdrawMoney } from '../../core/usecases/userUseCase/WithdrawMoney';
import { AddMoney } from '../../core/usecases/userUseCase/AddMoney';
import { ShowWallet } from '../../core/usecases/userUseCase/ShowWallet';
import { GetSeatsByIds } from '../../core/usecases/userUseCase/GetSeatsByIds';
import { CancelTickets } from '../../core/usecases/userUseCase/CancelTickets';




import { AlterSeatStatus } from '../../core/usecases/userUseCase/AlterSeatStatus';
import { ChangeBookStatus } from '../../core/usecases/userUseCase/ChangeBookStatus';
import { CloudinaryService } from '../../core/services/CloudinaryService';


interface AuthRequest extends Request {
  user: jwt.JwtPayload;
}

export class UserController {
  constructor(
    private _browseBus: BrowseBus,
    private _showProfile: ShowProfile,
    private _editUserName: EditName,
    private _editUserEmail: EditEmail,
    private _editUserPhone: EditPhone,
    private _searchDest: searchDest,
    private _searchSour: searchSour,
    private _showSeats: ShowSeats,
    private _bookSeats: BookSeats,
    private _payAmount: PayAmount,
    private _checkout: Checkout,
    private _alterSeatStatus: AlterSeatStatus,
    private _alterBookStatus: ChangeBookStatus,
    private _showBookings: ShowBooking,
    private _editUserPassword: EditPassword,
    private _editUserBooking: EditBooking,
    private _busIdBySchedule: BusIdBySchedule,
    private _cloudinaryService: CloudinaryService,
    private _uploadProfilePhotoUseCase: UploadProfilePicture,
    private _createWallet: CreateWallet,
    private _addMoney: AddMoney,
    private _withdrawMoney: WithdrawMoney,
    private _showWallet: ShowWallet,
    private _getSeatsByIds: GetSeatsByIds,
    private _cancelTicket: CancelTickets
  ) {}

  async getByLocation(req: Request, res: Response): Promise<void> {
    const { source , destination , date } = req.body;
    const serviceList = await this._browseBus.execute(source, destination, date);
    res.status(200).json(serviceList);
  }

  async getUserDetail(req: Request, res: Response): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = ((req as AuthRequest).user as any).id;

    const userData = await this._showProfile.execute(userId);
    res.status(200).json(userData);
  }

  async editName(req: Request, res: Response): Promise<void> {
    const { id, name } = req.body;
    await this._editUserName.execute(id, name);
    res.status(200).json({ message: 'Name updated successfully' });
  }

  async editEmail(req: Request, res: Response): Promise<void> {
    const { id, email } = req.body;
    await this._editUserEmail.execute(id, email);
    res.status(200).json({ message: 'Email updated successfully' });
  }

  async editPhone(req: Request, res: Response): Promise<void> {
    const { id, phone } = req.body;
    const result = await this._editUserPhone.execute(id, phone);
    res.status(200).json(result.message);
  }

  async editPassword(req: Request, res: Response): Promise<void> {
    const { email , oldPassword , newPassword } = req.body;
    await this._editUserPassword.execute(email, oldPassword , newPassword);
    res.status(200).json({ message: "password edited"})
  }

  async searchDestinations(req: Request, res: Response): Promise<void> {
    const query = req.query.query as string | undefined;

    if (!query) {
      res.status(400).json({ message: "Query parameter is required" });
      return;
    }

    const destinations = await this._searchDest.execute(query);
    res.status(200).json(destinations)
  }

  async searchSoures(req: Request, res: Response): Promise<void> {
    const query = req.query.query as string | undefined;

    if (!query) {
      res.status(400).json({ message: "Query parameter is required" });
      return;
    }

    const sources = await this._searchSour.execute(query);
    res.status(200).json(sources)
  }

 

  async getSeats(req: Request, res: Response): Promise<void> {
    const { busId , date } = req.body;
    if (!busId) {
      res.status(400).json({ message: " busId is required " });
      return;
    }
    const seats = await this._showSeats.execute(busId, date);
    res.status(200).json(seats)
  }


  
  async bookTheSeats(req: Request, res: Response): Promise<void> {
    try {
      
      
      const {
        name,
        email,
        phone,
        age,
        busId,
        userId,
        scheduleId,
        selectedSeats,
        source,
        destination,
        date,
        arrivalTime,
        departureTime,
        dropStop,
        pickupStop,
        quantity,
        amount,
        totalPrice,
        address,
        couponCode
      } = req.body;
  
   
  
      const bookingResult = await this._bookSeats.execute(
        name,
        email,
        phone,
        age,
        busId,
        userId,
        scheduleId,
        selectedSeats,
        source,
        destination,
        date,
        arrivalTime,
        departureTime,
        dropStop,
        pickupStop,
        quantity,
        amount,
        totalPrice,
        address,
        couponCode
      );
  
      if (bookingResult.success) {
        res.status(200).json(bookingResult);
      } else {
        res.status(201).json(bookingResult);
      }
    } catch (error) {
      console.error("Error in bookSeats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async checkoutPayment(req: Request, res: Response): Promise<void> {
    try {
      const { name ,description, price, quantity } = req.body; 
  
     
      const result = await this._checkout.execute(name,description,price,quantity);
  
      if (!result.success ) {
        res.status(400).json({ success: false, message: "Payment failed" });
      } else {
        res.status(200).json({ success: true, checkoutUrl: result.url, message: "Payment successful" });
      }
    } catch (error) {
      console.error("Error in payPrice:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async payPrice(req: Request, res: Response): Promise<void> {
    try {
      const { payment } = req.body; 
      
      const result = await this._payAmount.execute(payment);
  
      if (!result) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error in payPrice:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async changeSeatStatus(req: Request, res: Response){
    try{

    const { busId , date, seatNumbers, scheduleId , isAvailable } = req.body;
    
    const result = await this._alterSeatStatus.execute(busId,date,seatNumbers,scheduleId,isAvailable);

      if (!result.success) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error in change seat status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  }

  async changeBookStatus(req: Request, res: Response){
    try{

    const { bookingId , statu } = req.body;
    
    const result = await this._alterBookStatus.execute(bookingId,statu);

      if (!result.success) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
   } catch (error) {
    console.error("Error in change seat status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
   }
  }

  //cancelticket
  async deleteSeatsFromBooking(req: Request, res: Response){
    try{
      const { bookingId, seatNumbers } = req.body;
      const result = await this._cancelTicket.execute(bookingId, seatNumbers);
      if(!result.success){
        res.status(404).json(result);  
       }else{
        res.status(200).json(result);
       }
    }catch (error) {
        console.error("Error while debit Money:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  


  async fetchBookings(req: Request, res: Response): Promise<void>{
    try{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = ((req as AuthRequest).user as any).id;

    const result = await this._showBookings.execute(userId);
    if (!result.success) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }

    }catch(error){
      console.error("Error when fetching bookings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async editBooking(req: Request, res: Response): Promise<void>{
    try{

      const { bookingId , updatedFields } = req.body;
      
      const result = await this._editUserBooking.execute(bookingId,updatedFields);
        if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
     } catch (error) {
      console.error("Error in booking:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
     }

  }


  async getBusId(req: Request, res: Response){

    const { scheduleId } = req.body;

    try{
        const result = await this._busIdBySchedule.excute(scheduleId);
        if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
        console.error("Error in get busid:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

  }


  async uploadProfilePicture(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.userId;
      
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
  
      const updatedUser = await this._uploadProfilePhotoUseCase.execute(userId, req.file.path);
  
      res.status(200).json({ message: "Profile picture updated successfully", user: updatedUser });
    } catch (error: unknown) {
      console.error("Error uploading profile picture:", error);
  
      if (error instanceof Error) {
        res.status(500).json({ message: "Error uploading profile picture", error: error.message });
      } else {
        res.status(500).json({ message: "Error uploading profile picture", error: "An unknown error occurred" });
      }
    }
  }

  async setWallet(req: Request, res: Response){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = ((req as AuthRequest).user as any).id;



    try{
        const result = await this._createWallet.execute(userId);
        if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
        console.error("Error while create wallet:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async creditMoney(req: Request, res: Response){
    const { amount } = req.body;

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const userId = ((req as AuthRequest).user as any).id;

    try{
        const result = await this._addMoney.execute(userId,amount);
        if (result.message == "Invalid amount") {
        res.status(400).json(result);
      } else if(result.message == "Wallet not found") {
        res.status(404).json(result);
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
        console.error("Error while credit Money:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async debitMoney(req: Request, res: Response){

    const { userId , amount } = req.body;

    try{
        const result = await this._withdrawMoney.execute(userId,amount);
        if (result.message == "Invalid amount") {
        res.status(400).json(result);
      } else if(result.message == "Insufficient balance") {
        res.status(404).json(result);
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
        console.error("Error while debit Money:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

  }

  async getWallet(req: Request , res: Response){

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = ((req as AuthRequest).user as any).id;
    
    try{
      const result = await this._showWallet.execute(userId);
      if (!result.success) {
      res.status(400).json(result);
    }else {
      res.status(200).json(result);
    }
  } catch (error) {
      console.error("Error while debit Money:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }

 

      
  }


  async getSeatNumbers(req: Request , res: Response){ 
    try {
     const { seatsIds } =  req.body;
 
     const result = await this._getSeatsByIds.execute(seatsIds);
     if(!result.success){
      res.status(404).json(result);  
     }else{
      res.status(200).json(result);
     }
    } catch (error) {
      console.error("Error while debit Money:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
 }
  

  


  
}







