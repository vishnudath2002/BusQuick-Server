import { BookingRepository } from "../../../api/infrastructure/repositories/BookingRepository";
import { SeatRepository } from "../../../api/infrastructure/repositories/SeatRepository";
import { Booking } from "../../entities/Booking";
import { Types } from "mongoose";

export class BookSeats {
  constructor(
    private bookingRepository: BookingRepository,
    private seatRepository: SeatRepository
  ) {}

  async execute(
    name: string,
    email: string,
    phone: string,
    age: string,
    busId: string,
    userId: string,
    scheduleId: string,
    selectedSeats: string[],
    source: string,
    destination: string,
    date: Date,
    arrivalTime: string,
    departureTime: string,
    dropStop: string,
    pickupStop: string,
    quantity: number,
    amount: string,
    totalPrice: string,
    address: string,
    couponCode?: string 
  ): Promise<{ success: boolean; message: string ,data: string}> {
    try {
    
      if (
        !userId ||
        !scheduleId ||
        !selectedSeats.length ||
        !totalPrice ||
        !address ||
        !busId ||
        !name ||
        !email ||
        !phone ||
        !age
      ) {
        return { success: false, message: "Missing required fields" ,data:''};
      }
     
      const seatsIds = await this.seatRepository.getIdsByNameScheduleId(
        selectedSeats,
        scheduleId
      );

      if (!seatsIds.length) {
        return { success: false, message: "Invalid seat selection" ,data: ''};
      }

      const alreadyBookedSeats = await this.bookingRepository.getBookedSeats(scheduleId, seatsIds);
      if (alreadyBookedSeats.length > 0) {
        return { 
          success: false, 
          message: `Seats already booked`, 
          data: "" 
        };
      }

   
      const newBooking = new Booking(
        new Types.ObjectId().toString(),
        name,
        email,
        phone,
        age,
        userId,
        busId,
        scheduleId,
        source,
        destination,
        date,
        arrivalTime,
        departureTime,
        dropStop,
        pickupStop,
        seatsIds, 
        "pending",
        quantity,
        amount,
        totalPrice,
        new Date(),
        address,
        couponCode || "" 
      );

     
      const bookId = await this.bookingRepository.save(newBooking);

      if (bookId.length == 0) {
        return { success: false, message: "Booking already exists or failed to save" ,data:''};
      }

      return { success: true, message: "Successfully booked" , data: bookId};
    } catch (error) {
      console.error("Error in BookSeats.execute:", error);
      return { success: false, message: "Internal server error" ,data:""};
    }
  }
}
