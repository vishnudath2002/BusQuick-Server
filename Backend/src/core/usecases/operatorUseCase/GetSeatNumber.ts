import { ISeatRepository } from "../../interfaces/ISeatRepository";

export class GetSeatNumber {
    constructor(
        private seatRepository: ISeatRepository
    ){}

        async execute(seatNumbers: string[],busId: string){
            const seats = await this.seatRepository.getSeatIdsByNumbers(seatNumbers,busId);
            
            if(seats.length === 0){
            return { success: false, data:[]}
        }
        return { success: true, data: seats};
    }
}