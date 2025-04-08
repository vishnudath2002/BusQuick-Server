import { Booking } from "../entities/Booking";


export interface IBookingRepository {
    save(booking: Booking): Promise<string>;
    findAll(): Promise<Booking[]>;
    findByUserId(userId: string): Promise<Booking[]>;
    getBookedSeats(scheduleId: string, seatIds: string[]): Promise<string[]>;
    updateStatus(bookingId: string, status: string): Promise<boolean>;
    updateBooking(
        bookingId: string, 
        updatedFields: Partial<Booking>
      ): Promise<boolean>;
    findByScheduleIds(scheduleIds: string[]): Promise<Booking[]> ;
    findByOperator(operatorId: string): Promise<Booking[]>
    removeBookedSeats(bookingId: string, seatIds: string[]): Promise<boolean>
    findById(bookingId: string): Promise<Booking | null>
}
