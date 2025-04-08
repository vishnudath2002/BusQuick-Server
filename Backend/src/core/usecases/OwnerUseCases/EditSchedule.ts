import { IScheduleRepository } from "../../interfaces/IScheduleRepository";
import { Schedule } from "../../entities/Schedule";


export class EditSchedule {
    constructor(private scheduleRepository: IScheduleRepository){}

    async execute(scheduleId: string, updateData: Partial<Schedule>){
        const result = await this.scheduleRepository.updateSchedule(scheduleId,updateData);
        if(!result){
            return {success: false, message: "schedule not Edited",data:null}
        }
        return {success: true, message: "schedule Edited",data:result}
    }
}