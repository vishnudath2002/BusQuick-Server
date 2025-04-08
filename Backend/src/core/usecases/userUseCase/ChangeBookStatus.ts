import { BookingRepository } from "../../../api/infrastructure/repositories/BookingRepository";


export class ChangeBookStatus {
    constructor(
        private bookingRepository: BookingRepository
    ){}

    async execute(bookingId: string,status: string){
        const success = await this.bookingRepository.updateStatus(bookingId,status);
        if(!success){
            return { success: false, message: "Booking not updated" };
        }
        return { success: true, message: "successfully updated booking" };
    }
}