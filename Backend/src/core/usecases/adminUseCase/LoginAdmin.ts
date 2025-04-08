import { IAdminRepository } from "../../interfaces/IAdminRepository";
import { IAuthService } from "../../interfaces/IAuthService";

export class LoginAdmin {
  constructor(
    private adminRepository: IAdminRepository,
    private authService: IAuthService
  ) {}

  async execute(email: string, password: string) {
    // Check if user already exists
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      // User not found
      return { success: false, message: "User not found" };
    }

    
    if (!admin.password) return { success: false, message: "Invalid password" };

    // Check if password matches
    const isMatched = await this.authService.comparePassword(
      password,
      admin.password
    );

    if (!isMatched) {
      // Password mismatch
      return { success: false, message: "Password mismatch" };
    }

    // Generate authentication token or perform post-login operations
    const accessToken = await this.authService.generateAccessToken(admin.id,"admin");

    const refreshToken = await this.authService.generateRefreshToken(admin.id,"admin");

    return {
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    };
  }
}
