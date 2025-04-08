import { IScheduleRepository } from "../../interfaces/IScheduleRepository";

export class ShowSchedules {
    constructor(
        private scheduleRepository: IScheduleRepository
    ){}

    async execute(operatorId: string){
        const Schedules = await this.scheduleRepository.findByOperatorId(operatorId);
        
        if(Schedules.length == 0){
            return { success: false, data:[] };
        }
        return { success: true, data : Schedules };
    }
}