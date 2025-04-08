
import { BookingRepository } from "../../../api/infrastructure/repositories/BookingRepository";


export class ShowBookings {
    
    constructor(
        private bookingRepository: BookingRepository
    ){}

    async execute(operatorId: string){
        const bookings = await this.bookingRepository.findByOperator(operatorId);
       
        if(bookings.length == 0){
            return { success: false, data:[] };
        }
        return { success: true, data : bookings };
    }

}