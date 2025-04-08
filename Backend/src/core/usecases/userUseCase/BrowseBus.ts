import { IRouteRepository } from "../../interfaces/IRouteRepository"; 
import { IScheduleRepository } from "../../interfaces/IScheduleRepository";
import { IBusRepository } from "../../interfaces/IBusRepository";
import { ISeatRepository } from "../../interfaces/ISeatRepository";

export class BrowseBus {
  constructor(
    private routeRepository: IRouteRepository,
    private scheduleRepository: IScheduleRepository,
    private busRepository: IBusRepository,
    private seatRepository: ISeatRepository
  ) {}

  async execute(source: string, destination: string, date: string) {

   
    const inputDate = new Date(date).toISOString().split("T")[0];


    const route = await this.routeRepository.findBySourceAndDestination(source, destination);

    if (!route) {
      return { success: false, message: "No routes available" };
    }

   
    const schedules = await this.scheduleRepository.findByRouteIdDate(route.id, date);

    if (!schedules || schedules.length === 0) {
      return { success: false, message: "No schedules available" };
    }

   
    const enrichedSchedules = await Promise.all(
      schedules.map(async (schedule) => {
        const bus = await this.busRepository.findById(schedule.busId);
        const route = await this.routeRepository.findById(schedule.routeId);

        const matchedDate = schedule.dateSlots
          .map((d) => new Date(d).toISOString().split("T")[0])
          .find((d) => d === inputDate) || null;

        if (bus && matchedDate) {
        
          const availableSeats = await this.seatRepository.getAvailableSeatsByDate(
            schedule.busId,
            inputDate,
            schedule.id
          );
     

          return {
            scheduleId: schedule.id,
            price: schedule.price,
            date: matchedDate, 
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isActive: schedule.isActive,
            availableSeats, 
            bus: {
              id: bus.id,
              name: bus.name,
              type: bus.type,
            },
            route:{
              dropStops: route ? route?.dropStops : null,
              pickupStops: route ? route?.pickupStops : null
            }
          };
        }
        return null;
      })
    );


    const filteredSchedules = enrichedSchedules.filter((entry) => entry !== null);

    if (filteredSchedules.length === 0) {
      return { success: false, message: "No bus details available for schedules" };
    }

    return {
      success: true,
      message: "Schedules fetched successfully",
      schedules: filteredSchedules,
    };
  }
}
