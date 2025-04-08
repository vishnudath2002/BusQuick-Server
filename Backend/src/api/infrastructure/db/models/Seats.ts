import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ISeatAvailability {
  date: Date;
  isAvailable: boolean;
  scheduleId: ObjectId; // Link to the schedule
}

export interface ISeats extends Document {
  _id: ObjectId;
  BusId: ObjectId;
  SeatNumber: string;
  availability: ISeatAvailability[];
}

const SeatAvailabilitySchema: Schema = new Schema({
  date: { type: Date, required: true },
  isAvailable: { type: Boolean, required: true },
  scheduleId: { type: Schema.Types.ObjectId, ref: "Schedules", required: true }, // Linking to schedule
});

const SeatsSchema: Schema = new Schema({
  BusId: { type: Schema.Types.ObjectId, required: true, ref: "Buses" },
  SeatNumber: { type: String, required: true },
  availability: [SeatAvailabilitySchema], // Array of dates mapped to schedules
});

const Seats = mongoose.model<ISeats>("Seats", SeatsSchema);
export default Seats;
