import { IOtpRepository } from "../../../core/interfaces/IOtpRepository";
import { Otp } from "../../../core/entities/Otp";
import OtpModel from "../db/models/Otps";

export class OtpRepository implements IOtpRepository {
  async save(otp: Otp): Promise<void> {
    const userToSave = new OtpModel(otp);
    await userToSave.save();
  }

  async findOtpByEmail(email: string): Promise<Otp | null> {
    const otpDoc = await OtpModel.findOne({ email }).exec();

    // Map the Mongoose document to your User type
    if (!otpDoc) {
      return null;
    }

    return {
      email: otpDoc.email || '',
      otp: otpDoc.otp || '',
      createdAt: otpDoc.createdAt || ''
    };
  }

  async deleteOtpByEmail(email: string): Promise<void> {
    await OtpModel.deleteOne({email}).exec()   
  }
}
