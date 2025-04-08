export class Booking {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public age: string,
    public userId: string,
    public busId: string,
    public scheduleId: string,
    public source: string,
    public destination: string,
    public date: Date,
    public arrivalTime: string,
    public departureTime: string,
    public dropStops: string,
    public pickupStops: string,
    public seatsBooked: string[],
    public status: string,
    public quantity: number,
    public amount: string,
    public totalAmount: string,
    public bookingDate: Date = new Date(), 
    public address: string,
    public couponId?: string 
  ) {}
}
