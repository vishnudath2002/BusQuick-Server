import { IBusRepository } from "../../interfaces/IBusRepository";

export class DeleteBus {
    constructor(private busRepository: IBusRepository) {}

    async execute(busId: string){
        const result = await this.busRepository.deleteBus(busId);
        if(!result){
            return { success: false, message: " Bus Not Deleted "}
        }
        return { success: true, message: " Bus Deleted " };
    }
}