import { ISeatRepository } from "../../interfaces/ISeatRepository";

export class SetSeats {
  constructor(private seatRepository: ISeatRepository) {}

  async execute(
    busId: string,
    scheduleId: string,
    availability: { date: Date; isAvailable: boolean }[]
  ): Promise<boolean> {
    try {
      const updateResult = await this.seatRepository.setSeats(busId, scheduleId, availability);
      return updateResult;
    } catch (error) {
      console.error("Error setting seat availability:", error);
      return false;
    }
  }
}
