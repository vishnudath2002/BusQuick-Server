import { IOtpRepository } from "../../interfaces/IOtpRepository";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class VerifyUser {
    constructor(private otpRepository: IOtpRepository, private userRepository: IUserRepository){}

    async execute(otp: string, email: string){
        const otpDoc = await this.otpRepository.findOtpByEmail(email);
        if (!otpDoc) throw new Error("OTP not found or expired");

        if (otpDoc.otp !== otp) throw new Error("Invalid OTP");

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("User not found");

        user.otpVerified = true;
        await this.userRepository.updateByEmail(email, { otpVerified: true });

        await this.otpRepository.deleteOtpByEmail(email);

        return { success: true, message: "OTP verified successfully" };
    } catch (error: unknown) {
        if (error instanceof Error) {
        throw new Error(error.message || "An error occurred while verifying OTP");
       } else {
        throw new Error("An unknown error occurred" );
    }
    }
        
    

}