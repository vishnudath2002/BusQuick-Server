import { ISeatRepository } from "../../interfaces/ISeatRepository";

export class ShowSeats {
    constructor(
        private seatRepository: ISeatRepository
    ){}

    async execute(scheduleId: string, operatorId: string, date: string){
        const seats = await this.seatRepository.getSeatsByScheduleId(scheduleId,operatorId,date);

        if(seats.length === 0){
            return { success: false, data:[]}
        }
        return { success: true, data: seats};
    }
}