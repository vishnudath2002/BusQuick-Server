import { Request, Response } from "express";

import { ICancelSeats } from "../../core/iusecases/IOperatorUseCase/ICancelSeats";
// import { IGetSeatNumber } from "../../core/iusecases/IOperatorUseCase/IGetSeatNumber";
import { IShowBookings } from "../../core/iusecases/IOperatorUseCase/IShowBookings";
import { IShowSchedules } from "../../core/iusecases/IOperatorUseCase/IShowSchedules";
import { IShowSeats } from "../../core/iusecases/IOperatorUseCase/IShowSeats";


export class OperatorController {
  constructor(
    private _showBookings: IShowBookings,
    private _showSchedules: IShowSchedules,
    private _showSeats: IShowSeats,
    private _cancelSeats: ICancelSeats
  ) {}

  async fetchBookings(req: Request, res: Response) {
    try {
      const { operatorId } = req.params;
      const bookings = await this._showBookings.execute(operatorId);
      res.status(200).json(bookings);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async fetchSeats(req: Request,res: Response){
    try {
      const { scheduleId, operatorId, date } = req.body;
      const seats = await this._showSeats.execute(scheduleId, operatorId, date);
      res.status(200).json(seats);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async fetchSchedules(req: Request, res: Response) {
     try{
      const { operatorId } = req.params;
      const Schedules = await this._showSchedules.execute(operatorId);
      res.status(200).json(Schedules); 
     }catch(error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async deleteSeatsFromBooking(req: Request, res: Response){
    try{
      const { bookingId, seatNumbers } = req.body;
      const result = await this._cancelSeats.execute(bookingId, seatNumbers);
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
  
}