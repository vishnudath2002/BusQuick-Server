import { IBusRepository } from "../../interfaces/IBusRepository";
import { Bus } from "../../entities/Bus";


export class EditBus {
    constructor(private busRepository: IBusRepository){}

    async execute(busId: string, updateData: Partial<Bus>){
        const result = await this.busRepository.updateBus(busId,updateData);
        if(!result){
            return {success: false, message: "Bus not Edited",data:null}
        }
        return {success: true, message: "Bus Edited",data:result}
    }
}