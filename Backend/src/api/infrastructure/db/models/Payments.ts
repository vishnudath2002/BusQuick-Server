import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IPayments extends Document {
  _id: ObjectId;
  Amount: number;
  Payment_Status: string;
  Booking_Id: ObjectId;
  Payment_Date: Date;
}

const PaymentsSchema: Schema = new Schema({
  Amount: { type: Number, required: true },
  Payment_Status: { type: String, required: true },
  Booking_Id: { type: Schema.Types.ObjectId, required: true },
  Payment_Date: { type: Date, required: true },
});

const Payments = mongoose.model<IPayments>('Payments', PaymentsSchema);

export default Payments;

