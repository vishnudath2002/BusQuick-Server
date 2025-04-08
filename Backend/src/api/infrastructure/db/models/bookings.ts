import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IBooking extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  age: string;
  userId: ObjectId;
  busId: ObjectId;
  scheduleId: ObjectId;
  source: string;
  destination: string;
  date: Date;
  arrivalTime: string;
  departureTime: string;
  dropStops: string;
  pickupStops: string;
  seatsBooked: ObjectId[];
  status: string;
  quantity: number;
  amount: string;
  totalAmount: string;
  bookingDate: Date;
  address: string;
  couponId?: ObjectId;
}

const BookingSchema: Schema = new Schema({
  name: { type: String , required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: String, required: true }, 
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  busId: { type: Schema.Types.ObjectId, ref: "Buses", required: true },
  scheduleId: { type: Schema.Types.ObjectId, ref: "Schedules", required: true },
  source:  { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, require: true},
  arrivalTime:  { type: String, required: true },
  departureTime: { type: String, required: true },
  seatsBooked: [{ type: Schema.Types.ObjectId, ref: "Seats", required: true }],
  dropStops: { type: String, required: true },
  pickupStops: { type: String, required: true },
  status: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: String, required: true },
  totalAmount: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  address: { type: String, required: true},
  couponId: { type: String,  default: null }, 
});

const deletePendingBookings = async () => {
  const fiveMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

  await Booking.deleteMany({
    status: "pending",
    bookingDate: { $lte: fiveMinutesAgo },
  });
};

setInterval(deletePendingBookings, 60 * 1000);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
