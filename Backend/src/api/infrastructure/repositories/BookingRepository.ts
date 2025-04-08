import { IBookingRepository } from "../../../core/interfaces/IBookingRepository";
import { Booking } from "../../../core/entities/Booking";
import Bookings from "../db/models/bookings"; 
import Seats from "../db/models/Seats";
import Schedules from "../db/models/Schedules";

export class BookingRepository implements IBookingRepository {

  // Save a new booking
  async save(booking: Booking): Promise<string> {
    const existingBooking = await Bookings.findOne({
      userId: booking.userId,
      scheduleId: booking.scheduleId,
      status: 'Booked',
    });

    if (existingBooking) {
      return '';
    }


  

    const bookingToSave = new Bookings({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      age: booking.age,
      userId: booking.userId,
      busId: booking.busId,
      scheduleId: booking.scheduleId,
      source: booking.source,
      destination: booking.destination,
      date: booking.date,
      arrivalTime: booking.arrivalTime,
      departureTime: booking.departureTime,
      dropStops: booking.dropStops,
      pickupStops: booking.pickupStops,
      seatsBooked: booking.seatsBooked,
      status: booking.status,
      quantity: booking.quantity,
      amount: booking.amount,
      totalAmount: booking.totalAmount,
      bookingDate: booking.bookingDate,
      address: booking.address,
      couponId: booking.couponId || null,
    });

    await bookingToSave.save();
    return bookingToSave._id.toString();
  }


  async findAll(): Promise<Booking[]> {
    const bookings = await Bookings.find().exec();
  
    const bookingsWithSeats = await Promise.all(

      bookings.map(async (booking) => {
        const seatDocs = await Seats.find({
          _id: { $in: booking.seatsBooked },
        }).select("SeatNumber"); 
         
        const seatNames = seatDocs.map(seat => seat.SeatNumber); // Extract seat names
  
        return new Booking(
          booking.id,
          booking.name,
          booking.email,
          booking.phone,
          booking.age,
          booking.userId?.toString() || '',
          booking.busId?.toString() || '',
          booking.scheduleId?.toString() || '',
          booking.source?.toString() || '',
          booking.destination?.toString() || '',
          booking.date,
          booking.arrivalTime,
          booking.departureTime,
          booking.dropStops,
          booking.pickupStops,
          seatNames, 
          booking.status,
          booking.quantity,
          booking.amount,
          booking.totalAmount,
          booking.bookingDate,
          booking.couponId?.toString() || ''
        );
      })
    );
  
    return bookingsWithSeats;

  }
  


  //   // Find a booking by ID
  async findById(bookingId: string): Promise<Booking | null> {
    const bookingDoc = await Bookings.findById(bookingId).exec();
    if (!bookingDoc) return null;
  
    // Fetch seat details
    const seatDocs = await Seats.find({
      _id: { $in: bookingDoc.seatsBooked },
    }).select("SeatNumber");
  
    const seatNames = seatDocs.map(seat => seat.SeatNumber); // Extract seat names
  
    return new Booking(
      bookingDoc.id,
      bookingDoc.name,
      bookingDoc.email,
      bookingDoc.phone,
      bookingDoc.age,
      bookingDoc.userId?.toString() || '',
      bookingDoc.busId?.toString() || '',
      bookingDoc.scheduleId?.toString() || '',
      bookingDoc.source?.toString() || '',
      bookingDoc.destination?.toString() || '',
      bookingDoc.date,
      bookingDoc.arrivalTime,
      bookingDoc.departureTime,
      bookingDoc.dropStops,
      bookingDoc.pickupStops,
      seatNames,
      bookingDoc.status,
      bookingDoc.quantity,
      bookingDoc.amount,
      bookingDoc.totalAmount,
      bookingDoc.bookingDate,
      bookingDoc.couponId?.toString() || ''
    );
  }
  

  
    async findByUserId(userId: string): Promise<Booking[]> {
 
      const bookings = await Bookings.find({ userId }).exec();
      
      const bookingsWithSeats = await Promise.all(
        bookings.map(async (booking) => {
          const seatNames = await Seats.find({
            _id: { $in: booking.seatsBooked }, 
          }).select("SeatNumber"); 
    
          return new Booking(
            booking.id,
            booking.name,
            booking.email,
            booking.phone,
            booking.age,
            booking.userId?.toString() || '',
            booking.busId?.toString() || '',
            booking.scheduleId?.toString() || '',
            booking.source?.toString() || '',
            booking.destination?.toString() || '',
            booking.date,
            booking.arrivalTime,
            booking.departureTime,
            booking.dropStops,
            booking.pickupStops,
            seatNames.map(seat => seat.SeatNumber), // Convert seat IDs to names
            booking.status,
            booking.quantity,
            booking.amount,
            booking.totalAmount,
            booking.bookingDate,
            booking.couponId?.toString() || ''
          );
        })
      );
    
      return bookingsWithSeats;
    }

    async updateBooking(
      bookingId: string, 
      updatedFields: Partial<Booking>
    ): Promise<boolean> {
      try {
        const updatedBooking = await Bookings.findByIdAndUpdate(
          bookingId, 
          { $set: updatedFields }, 
          { new: true } 
        ).exec();
    
        return !!updatedBooking; 
      } catch (error) {
        console.error("Error updating booking:", error);
        return false;
      }
    }

  //   async findByScheduleId(scheduleId: string): Promise<Booking[]> {
  //     const bookings = await Bookings.find({ scheduleId }).exec();
  //     return bookings.map(booking => new Booking(
  //       booking.userId?.toString() || '',
  //       booking.scheduleId?.toString() || '',
  //       booking.seatsBooked?.map(seat => seat.toString()) || [],
  //       booking.status,
  //       booking.totalAmount,
  //       booking.bookingDate,
  //       booking.couponId?.toString() || ''
  //     ));
  //   }

  //   // Search bookings by status
  //   async findByStatus(status: string): Promise<Booking[]> {
  //     const bookings = await Bookings.find({ status }).exec();
  //     return bookings.map(booking => new Booking(
  //       booking.userId?.toString() || '',
  //       booking.scheduleId?.toString() || '',
  //       booking.seatsBooked?.map(seat => seat.toString()) || [],
  //       booking.status,
  //       booking.totalAmount,
  //       booking.bookingDate,
  //       booking.couponId?.toString() || ''
  //     ));
  //   }

  //   // Search bookings by user and status
  //   async findByUserAndStatus(userId: string, status: string): Promise<Booking[]> {
  //     const bookings = await Bookings.find({ userId, status }).exec();
  //     return bookings.map(booking => new Booking(
  //       booking.userId?.toString() || '',
  //       booking.scheduleId?.toString() || '',
  //       booking.seatsBooked?.map(seat => seat.toString()) || [],
  //       booking.status,
  //       booking.totalAmount,
  //       booking.bookingDate,
  //       booking.couponId?.toString() || ''
  //     ));
  //   }

  // Update booking status
  async updateStatus(bookingId: string, status: string): Promise<boolean> {
    await Bookings.findByIdAndUpdate(bookingId, { status }).exec();
    return true;
  }
  
  async getBookedSeats(scheduleId: string, seatIds: string[]): Promise<string[]> {
    const bookedSeats = await Bookings.find({
      scheduleId,
      seatsBooked: { $in: seatIds },
    }).select("seatsBooked");

    return bookedSeats.flatMap((booking) => booking.seatsBooked.map((seat) => seat.toString()));
  }

  async findByScheduleIds(scheduleIds: string[]): Promise<Booking[]> {

    const bookings = await Bookings.find({ scheduleId: { $in: scheduleIds } }).exec();
  
    return bookings.map((booking) => new Booking(
      booking.id,
      booking.name,
      booking.email,
      booking.phone,
      booking.age,
      booking.userId?.toString() || '',
      booking.busId?.toString() || '',
      booking.scheduleId?.toString() || '',
      booking.source?.toString() || '',
      booking.destination?.toString() || '',
      booking.date,
      booking.arrivalTime,
      booking.departureTime,
      booking.dropStops,
      booking.pickupStops,
      booking.seatsBooked?.map(seat => seat.toString()) || [],
      booking.status,
      booking.quantity,
      booking.amount,
      booking.totalAmount,
      booking.bookingDate,
      booking.couponId?.toString() || ''
    ));
  }


  async findByOperator(operatorId: string): Promise<Booking[]> {
    const schedules = await Schedules.find({ Operator_Id: operatorId }).select('_id').exec();
    const scheduleIds = schedules.map(schedule => schedule._id);

    const bookings = await Bookings.find({ scheduleId: { $in: scheduleIds } }).exec();

    const bookingsWithSeats = await Promise.all(
      bookings.map(async (booking) => {
        const seatNames = await Seats.find({
          _id: { $in: booking.seatsBooked }, 
        }).select("SeatNumber"); 
  
        return new Booking(
          booking.id,
          booking.name,
          booking.email,
          booking.phone,
          booking.age,
          booking.userId?.toString() || '',
          booking.busId?.toString() || '',
          booking.scheduleId?.toString() || '',
          booking.source?.toString() || '',
          booking.destination?.toString() || '',
          booking.date,
          booking.arrivalTime,
          booking.departureTime,
          booking.dropStops,
          booking.pickupStops,
          seatNames.map(seat => seat.SeatNumber), // Convert seat IDs to names
          booking.status,
          booking.quantity,
          booking.amount,
          booking.totalAmount,
          booking.bookingDate,
          booking.couponId?.toString() || ''
        );
      })
    );
  
    return bookingsWithSeats;
}


  async removeBookedSeats(bookingId: string, seatIds: string[]): Promise<boolean> {
    const updatedBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      { $pull: { seatsBooked: { $in: seatIds } } },
      { new: true }
    ).exec();

    return !!updatedBooking;
  }
  


}
