import { Booking } from "../../entities/Booking";

export interface IShowBookings {
  execute(operatorId: string): Promise<{
    success: boolean;
    data: Booking[];
  }>;
}
