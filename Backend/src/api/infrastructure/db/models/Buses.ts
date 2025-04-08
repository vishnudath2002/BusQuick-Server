import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBuses extends Document {
  _id: ObjectId;
  OwnerId: ObjectId;
  Name: string;
  Status: string | null;
  Type: string;
  SeatsAvailable: string | null;
  CreatedAt: Date;
  UpdatedAt: Date | null;
  SeatsTotal: number | null;
  BusDoc: string | null;
  Ac: boolean | null;
}

const BusesSchema: Schema = new Schema({
  OwnerId: { type: Schema.Types.ObjectId, ref: 'Users' },
  Name: { type: String },
  Status: { type: String },
  Type: { type: String },
  SeatsAvailable: { type: Number },
  CreatedAt: { type: Date },
  UpdatedAt: { type: Date },
  SeatsTotal: { type: Number },
  BusDoc: { type: String },
  Ac: { type: Boolean },
});

const Buses = mongoose.model<IBuses>('Buses', BusesSchema);
export default Buses;
