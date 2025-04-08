import { ScheduleRepository } from "../../../api/infrastructure/repositories/ScheduleRepository";

export class BusIdBySchedule {
    constructor(
        private scheduleRepository: ScheduleRepository
    ){}

    async excute(scheduleId: string){
        const result = await this.scheduleRepository.getBusIdByScheduleId(scheduleId);
        if(!result){
            return { success: false, message: "not get busId" , data: null };
        }
        return { success: true, message: "successfully get busId", data: result };
   }
}