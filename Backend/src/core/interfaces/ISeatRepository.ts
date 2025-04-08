import { Seat } from "../entities/Seat";

export interface ISeatRepository {
    addSeats(
        busId: string, seatCount: number, rowLabel: string
    ): Promise<boolean>;

    getSeats(
        busId: string,
        date: string
    ): Promise<Seat[]>;

    setSeats(
        busId: string,
        scheduleId: string,
        availability: { date: Date; isAvailable: boolean }[]
    ): Promise<boolean>;

    getAvailableSeatsByDate(
        busId: string,
        date: string, 
        scheduleId: string
        ): Promise<number>;

    getIdsByNameScheduleId(
        name: string[],
        scheduleId: string
    ): Promise<string[]>;

    updateSeatAvailability(
        busId: string,
        date: string, 
        seatNumbers: string[], 
        scheduleId: string, 
        isAvailable: boolean
    ): Promise<boolean>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSeatsByScheduleId(scheduleId: string, operatorId: string, date: string) : Promise<any>;

    getSeatNumbersByIds(seatIds: string[]): Promise<string[]>

    getSeatIdsByNumbers(seatNumbers: string[], busId: string): Promise<string[]>
    
}