import { Seat } from "../../entities/Seat";

export interface IShowSeats {
  execute(scheduleId: string, operatorId: string, date: string): Promise<{
    success: boolean;
    data: Seat[];
  }>;
}
