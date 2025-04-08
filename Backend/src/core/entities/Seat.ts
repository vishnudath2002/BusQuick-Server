export class Seat {
    constructor(
        public BusId: string,
        public SeatNumber: string,
        public availability: { date: Date; isAvailable: boolean; scheduleId: string }[] 
    ) {}
}
