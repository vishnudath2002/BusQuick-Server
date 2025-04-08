import { ISeatRepository } from "../../interfaces/ISeatRepository";
export class ShowSeats {
    constructor(
        private seatRepository: ISeatRepository
    ) {}
     async execute(busId: string, date: string){
        const seat  = await this.seatRepository.getSeats(busId,date);
        if(!seat){
            return { success: false , seats:null}
        }

        return {
            success: true,
            seats:seat
        }
     }
}