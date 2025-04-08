
import { BookingRepository } from "../../../api/infrastructure/repositories/BookingRepository";


export class ShowBooking {
    constructor(
        private bookingRepository: BookingRepository
    ){}

    async execute(userId: string){
        const bookings = await this.bookingRepository.findByUserId(userId);
       
        if(bookings.length == 0){
            return { success: false, data:[] };
        }
        return { success: true, data : bookings };
    }

}