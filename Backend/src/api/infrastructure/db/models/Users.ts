import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  photo: { type: String, default: '' },
  role: String,
  isBlocked: Boolean,
  otpVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  // expiresAt: { type: Date, default: () => new Date(Date.now() + 300 * 1000) }, // expires in 5 minutes
});

// Apply a TTL index only when otpVerified is false
// UserSchema.index(
//   { expiresAt: 1 },
//   {
//     expireAfterSeconds: 0,
//     partialFilterExpression: { otpVerified: false },
//   }
// );

const Users = mongoose.model("User", UserSchema);
export default Users;
