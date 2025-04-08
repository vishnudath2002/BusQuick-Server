import { IScheduleRepository } from "../../interfaces/IScheduleRepository";
import { IBookingRepository } from "../../interfaces/IBookingRepository";
import { Booking } from "../../entities/Booking";

interface GetBookingsResponse {
  success: boolean;
  message: string;
  scheduleIds?: string[];
  bookings?: Booking[];
}

export class GetBookings {
  constructor(
    private scheduleRepository: IScheduleRepository,
    private bookingRepository: IBookingRepository
  ) {}

  async execute(ownerId: string): Promise<GetBookingsResponse> {
    try {
   
      const scheduleIds = await this.scheduleRepository.getScheduleIdsByOwnerId(ownerId);

      if (!scheduleIds || scheduleIds.length === 0) {
        return { success: false, message: "No schedules found for the given owner ID", scheduleIds: [] };
      }

      const bookings = await this.bookingRepository.findByScheduleIds(scheduleIds);

      return { success: true, message: "Schedules and bookings found", scheduleIds, bookings };
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return { success: false, message: "Error fetching schedules", scheduleIds: [] };
    }
  }
}
