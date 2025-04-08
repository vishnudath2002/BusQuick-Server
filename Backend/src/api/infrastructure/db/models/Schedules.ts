import mongoose, { Schema, Document, ObjectId } from 'mongoose';



export interface ISchedules extends Document {
  _id: ObjectId;
  Price: string; 
  OwnerId: ObjectId;
  Operator_Id: ObjectId;
  Bus_Id: ObjectId;
  Route_Id: ObjectId;
  dateSlots: Date[]; 
  startTime: string;
  endTime: string;
  status:string;
  isActive: boolean;
}


const SchedulesSchema: Schema = new Schema({
  Price: { type: String, required: true },
  OwnerId: { type: Schema.Types.ObjectId, ref: 'Owners', required: true },
  Operator_Id: { type: Schema.Types.ObjectId},
  Bus_Id: { type: Schema.Types.ObjectId, required: true ,ref: 'Buses'},
  Route_Id: { type: Schema.Types.ObjectId, required: true ,ref: 'Routes'},
  dateSlots: { type: [Date] , required: true },
  startTime:{ type: String },
  endTime: { type: String },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled", "Expired"], default: "Scheduled" },
  isActive: { type: Boolean, default: true },
});

const Schedules = mongoose.model<ISchedules>('Schedules', SchedulesSchema);
export default Schedules;
