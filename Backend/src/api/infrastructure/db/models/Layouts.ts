import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILayouts extends Document {
  busId: ObjectId;
  row: number;
  column: number;
  seatNumber: number;
  section: string;
}

const LayoutSchema = new Schema<ILayouts>({
  busId: { type: Schema.Types.ObjectId, required: true, ref: "Bus" },
  row: { type: Number, required: true },
  column: { type: Number, required: true },
  seatNumber: { type: Number, required: true },
  section: { type: String, required: true },
});

export default mongoose.model<ILayouts>("Layouts", LayoutSchema);
