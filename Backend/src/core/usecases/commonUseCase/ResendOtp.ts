import { IOtpService } from "../../interfaces/IOtpService";
import { IEmailService } from "../../interfaces/IEmailService";
import { IOtpRepository } from "../../interfaces/IOtpRepository";

export class ResendOtp{
    constructor(
        private otpService: IOtpService,
        private otpRepository: IOtpRepository,
        private emailService: IEmailService
    ){}

    async execute(email:string){
        const otp = this.otpService.createOtp();

        this.otpRepository.deleteOtpByEmail(email);

    
    await Promise.all([
        this.otpRepository.save({ email, otp }),
        this.emailService.sendEmail(email, 'Your Resended OTP Code', `Your OTP code is: ${otp}`)
      ]);

        return { success: true, message: "OTP Resended"}
    }

}