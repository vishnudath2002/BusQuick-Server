import { IScheduleRepository } from "../../interfaces/IScheduleRepository";
import { Schedule } from "../../entities/Schedule";



export class AddSchedule {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(schedule: Schedule){
    const result = await this.scheduleRepository.save(schedule);
    if (!result) {
      return {success: false, message: "Schedule already exists",result}   ; 
    }
    return {success: true, message: "Schedule added",result};
  } 
}