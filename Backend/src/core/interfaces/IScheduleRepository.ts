import { Schedule } from "../entities/Schedule";

export interface IScheduleRepository {
  save(schedule: Schedule): Promise<Schedule[] | null>;
  findById(scheduleId: string): Promise<Schedule | null>;
  // findByBusId(busId: string): Promise<Schedule[]>;
  findByRouteIdDate(routeId: string , date: string): Promise<Schedule[]>;
  findByOperatorId(operatorId: string): Promise<Schedule[]>;
  findByOwnerId(ownerId: string): Promise<Schedule[]>;
  updateSchedule(scheduleId: string, schedule: Partial<Schedule>): Promise<boolean>;
  getBusIdByScheduleId(scheduleId: string): Promise<string | null> ;
  getScheduleIdsByOwnerId(ownerId: string): Promise<string[]>;
  deleteSchedule(scheduleId: string): Promise<boolean>
}