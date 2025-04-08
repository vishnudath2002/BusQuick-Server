import { IUserRepository } from "../../interfaces/IUserRepository";
import { IAuthService } from "../../interfaces/IAuthService";
import { IOtpService } from "../../interfaces/IOtpService";
import { IEmailService } from "../../interfaces/IEmailService";
import { User } from "../../entities/User";
import { IOtpRepository } from "../../interfaces/IOtpRepository";

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
    private otpService: IOtpService,
    private otpRepository: IOtpRepository,
    private emailService: IEmailService
  ) {}

  async execute(name: string, email: string, password: string, phone: string, role: string) {

 
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) return { success: false, message: "User already exists" };

    const phoneAlreadyExist = await this.userRepository.findByPhone(phone);
    if(phoneAlreadyExist) return { success: false, message: "phone number already exists"}


    const [hashedPassword, otp] = await Promise.all([
      this.authService.hashPassword(password),
      this.otpService.createOtp()
    ]);

  
    const user = new User('', name, email, hashedPassword, phone,'', role);
    

    await Promise.all([
      this.userRepository.save(user),
      this.otpRepository.save({ email, otp })
    ]);


    this.emailService.sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`)
      .catch(err => console.error("Failed to send OTP email:", err)); 

    return { success: true, message: 'User registered successfully! Please verify your OTP.' };

  }
}
