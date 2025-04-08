import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IRoutes extends Document {
  _id: ObjectId;
  OwnerId: ObjectId;
  Source: string;
  Destination: string;
  PickupStops:string[],
  DropStops: string[];
  Distance: number;
  CreatedAt: Date;
  EstimatedTime: string;
  UpdatedAt: Date | null;
}

const RoutesSchema: Schema = new Schema({
  OwnerId: { type: Schema.Types.ObjectId, required: true },
  Source: { type: String, required: true },
  Destination: { type: String, required: true },
  PickupStops: [{ type: String, required: true }],
  DropStops: [{ type: String, required: true }],
  Distance: { type: Number, required: true },
  CreatedAt: { type: Date, required: true },
  EstimatedTime: { type: String, required: true },
  UpdatedAt: { type: Date },
});

const Routes = mongoose.model<IRoutes>('Routes', RoutesSchema);
export default Routes;
