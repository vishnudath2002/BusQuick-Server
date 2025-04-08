import { Schedule } from "../../entities/Schedule";

export interface IShowSchedules {
  execute(operatorId: string): Promise<{
    success: boolean;
    data: Schedule[];
  }>;
}
