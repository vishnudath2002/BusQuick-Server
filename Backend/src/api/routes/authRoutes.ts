import express from "express";
import { AuthController } from "../controllers/AuthController";
import { RegisterUser } from "../../core/usecases/commonUseCase/RegisterUser";
import { LoginUser } from "../../core/usecases/commonUseCase/LoginUser";
import { VerifyUser } from "../../core/usecases/commonUseCase/VerifyUser";
import { RefreshToken } from "../../core/usecases/commonUseCase/RefreshToken";
import { PasswordReset } from "../../core/usecases/commonUseCase/PasswordReset";
import { ResetPassword } from "../../core/usecases/commonUseCase/ResetPassword";
import { ResendOtp } from "../../core/usecases/commonUseCase/ResendOtp";

import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthService } from "../../core/services/AuthService";
import { OtpService } from "../../core/services/OtpService";
import { OtpRepository } from "../infrastructure/repositories/OtpRepository";
import { EmailService } from "../../core/services/EmailService";


const router = express.Router();
const userRepository = new UserRepository();
const authService = new AuthService();
const otpService = new OtpService();
const otpRepository = new OtpRepository();
const emailService = new EmailService();


const authController = new AuthController(
  new RegisterUser(
    userRepository,
    authService,
    otpService,
    otpRepository,
    emailService
  ),
  new LoginUser(userRepository, authService),
  new VerifyUser(otpRepository, userRepository),
  new RefreshToken(authService),
  new PasswordReset(userRepository, otpRepository, emailService),
  new ResetPassword(userRepository,otpRepository),
  new ResendOtp(otpService,otpRepository,emailService)
);

router.post("/register", authController.register.bind(authController));

router.post("/login", authController.login.bind(authController));

router.post("/verify-otp", authController.verify.bind(authController));

router.post("/resend-otp", authController.otpResend.bind(authController));

router.post("/refresh-token", authController.sendToken.bind(authController));

router.post("/logout", authController.logout.bind(authController));

router.post("/request-reset", authController.requestReset.bind(authController));


router.post("/reset-password", authController.reset.bind(authController));




export default router;
