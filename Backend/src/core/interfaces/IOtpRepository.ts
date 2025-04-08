import { Otp } from "../entities/Otp";


export interface IOtpRepository {
    save(otp: { email: string; otp: string }): Promise<void>;
    findOtpByEmail(email: string): Promise<Otp | null>;
    deleteOtpByEmail(email: string): Promise<void>;
  }