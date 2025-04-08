import { ISeatRepository } from "../../interfaces/ISeatRepository";



export class AddSeats {
    constructor(private seatRepository: ISeatRepository){}

    async execute( busId : string, seatCount : number, rowLabel : string){
        const result = await this.seatRepository.addSeats( busId , seatCount, rowLabel);
        if(result){
            return { success: true, message: "seats added" }
        }
        else{
            return { success: false, message: "seats not added" }
        }
    }
}