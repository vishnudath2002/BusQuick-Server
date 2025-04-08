import { ISeatRepository } from "../../interfaces/ISeatRepository";
export class AlterSeatStatus {
    constructor(
        private seatRepository: ISeatRepository
    ) {}
     async execute(busId: string, date: string,seatNumbers: string[], scheduleId: string, isAvailable: boolean){
        const result  = await this.seatRepository.updateSeatAvailability(busId,date,seatNumbers, scheduleId, isAvailable);
        if(!result){
            return { success: false , message:'Seat Not Updated'}
        }
      
        return {
            success: true,
            message:"Seat updated successfully"
        }
     }
}