import { ISeatRepository } from "../../interfaces/ISeatRepository";

export class GetSeatsByIds {
    constructor(
        private seatRepository: ISeatRepository
    ) {}

    async execute(seatIds: string[]){
        const seatsNumbers = await this.seatRepository.getSeatNumbersByIds(seatIds);

        if(seatsNumbers.length == 0){
            return { success: false , message: "no seats"}
        }

        return { success: true , message: " get seatnumbers", data: seatsNumbers}
    }
}