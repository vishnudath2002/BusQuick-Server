export interface ICancelSeats {
    execute(bookingId: string, seatNumbers: string[]): Promise<{
      success: boolean;
      message: string;
    }>;
  }
  