import { IScheduleRepository } from "../../interfaces/IScheduleRepository";
import { Schedule } from "../../entities/Schedule";

interface GetScheduleResponse {
    success: boolean;
    message: string;
    schedules?: Schedule[];
}

export class GetSchedule {
    constructor(private scheduleRepository: IScheduleRepository) {}

    async execute(ownerId: string): Promise<GetScheduleResponse> {
        const schedules = await this.scheduleRepository.findByOwnerId(ownerId);
        if (schedules.length === 0) {
            return {success: false, message: "No schedules found for the given owner ID", schedules: []};
        }
        return {success: true, message: "Schedules found", schedules: schedules};
        }

}   