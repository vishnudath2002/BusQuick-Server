import { IUserRepository } from "../../interfaces/IUserRepository";
import { IOtpRepository } from "../../interfaces/IOtpRepository";

export class ResetPassword {
    constructor(private userRepository: IUserRepository, private otpRepository: IOtpRepository) {}

    async execute(email: string, newPassword: string): Promise<{ success: boolean; message: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return { success: false, message: "User not found" };

        await this.userRepository.updatePassword(email, newPassword);
        await this.otpRepository.deleteOtpByEmail(email); 

        return { success: true, message: "Password reset successfully!" };
    }
}
