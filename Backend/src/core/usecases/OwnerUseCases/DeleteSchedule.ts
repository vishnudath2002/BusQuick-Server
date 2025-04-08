import { IScheduleRepository } from "../../interfaces/IScheduleRepository";

export class DeleteSchedule {
    constructor(private scheduleRepository: IScheduleRepository) {}

    async execute(scheduleId: string){
        const result = await this.scheduleRepository.deleteSchedule(scheduleId);
        if(!result){
            return { success: false, message: " schedule Not Deleted "}
        }
        return { success: true, message: " schedule Deleted " };
    }
}

