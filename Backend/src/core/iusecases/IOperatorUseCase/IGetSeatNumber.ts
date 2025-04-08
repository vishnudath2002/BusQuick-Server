import { Seat } from "../../entities/Seat"; // adjust path if needed

export interface IGetSeatNumber {
  execute(seatNumbers: string[], busId: string): Promise<{
    success: boolean;
    data: Seat[];
  }>;
}
