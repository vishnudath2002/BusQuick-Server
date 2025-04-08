import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ITransaction {
  _id?: ObjectId; 
  Amount: number;
  Date?: Date | null;
  Type: "credit" | "debit";
}

export interface IWallet extends Document {
  Balance: number;
  User_Id: ObjectId | null;
  Transaction_History: ITransaction[];
}

const TransactionSchema = new Schema<ITransaction>({
  Amount: { type: Number, required: true },
  Date: { type: Date, default: Date.now },
  Type: { type: String, enum: ["credit", "debit"], required: true },
});

const WalletSchema: Schema = new Schema<IWallet>({
  Balance: { type: Number, default: 0 },
  User_Id: { type: Schema.Types.ObjectId, ref: "User", required: false },
  Transaction_History: [TransactionSchema], // Embedded schema
});

const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema);

export default Wallet;

