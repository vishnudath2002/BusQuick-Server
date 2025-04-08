import { IUserRepository } from "../../interfaces/IUserRepository";
import { IOtpRepository } from "../../interfaces/IOtpRepository";
import { Otp } from "../../entities/Otp";
import { IEmailService } from "../../interfaces/IEmailService";

export class PasswordReset {
    constructor(private userRepository: IUserRepository,
                private otpRepository: IOtpRepository,
                private emailService: IEmailService ) {}

    async execute(email: string): Promise<{ success: boolean; message: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return { success: false, message: "User not found" };

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const newOtp = new Otp(email, otp, new Date());

        await this.otpRepository.save(newOtp);

        await this.emailService.sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

        return { success: true, message: "Password reset OTP sent successfully!" };
    }
}
