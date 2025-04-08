import { BookingRepository } from "../../../api/infrastructure/repositories/BookingRepository";
import { Booking } from "../../entities/Booking";

export class EditBooking {
    constructor(
        private bookingRepository: BookingRepository
    ){}

    async execute( bookingId: string, updatedFields: Partial<Booking>){
        const success = await this.bookingRepository.updateBooking(bookingId, updatedFields);
        if (!success) {
            return { success: false, message: "booking not updated" };
        }
        return { success: true, message: "updated" };
    }
    
}