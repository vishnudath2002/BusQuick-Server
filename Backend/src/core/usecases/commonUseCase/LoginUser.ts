import { IUserRepository } from "../../interfaces/IUserRepository";
import { IAuthService } from "../../interfaces/IAuthService";
// import { IOtpService } from "../interfaces/IOtpService";
// import { IEmailService } from "../interfaces/IEmailService";
// import { User } from "../entities/User";
// import { IOtpRepository } from "../interfaces/IOtpRepository";

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(email: string, password: string) {
    
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
  
      return { success: false, message: "User not found" };
    }

    if (user.isBlocked == true)
      return { success: false, message: "User Blocked" };

    if (!user.otpVerified)
      return { success: false, message: "User not verified" };

    if (!user.password) return { success: false, message: "Invalid password" };


    const isMatched = await this.authService.comparePassword(
      password,
      user.password
    );

    if (!isMatched) {
      return { success: false, message: "Password mismatch" };
    }

   
    const accessToken = await this.authService.generateAccessToken(user.id,user.role);

    const refreshToken = await this.authService.generateRefreshToken(user.id,user.role);

    return {
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
