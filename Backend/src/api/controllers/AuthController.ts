import { Request, Response } from "express";
import { ILoginUser } from "../../core/iusecases/ICommonUseCase/ILoginUser";
import { IVerifyUser } from "../../core/iusecases/ICommonUseCase/IVerifyUser";
import { IResendOtp } from "../../core/iusecases/ICommonUseCase/IResendOtp";
import { IResetPassword } from "../../core/iusecases/ICommonUseCase/IResetPassword";
import { IRefreshToken } from "../../core/iusecases/ICommonUseCase/IRefreshToken";
import { IPasswordReset } from "../../core/iusecases/ICommonUseCase/IPasswordReset";
import { IRegisterUser } from "../../core/iusecases/ICommonUseCase/IRegisterUser";




export class AuthController {
  constructor(
    private _registerUser: IRegisterUser,
    private _loginUser: ILoginUser,
    private _verifyUser: IVerifyUser,
    private _refreshToken: IRefreshToken,
    private _requestPasswordReset: IPasswordReset,
    private _resetPassword: IResetPassword,
    private _resendOtp: IResendOtp
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone, role } = req.body;
      const result = await this._registerUser.execute(name, email, password, phone, role);
      res.status(200).send(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: "An unknown error occurred" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this._loginUser.execute(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { otp, email } = req.body;
      const result = await this._verifyUser.execute(otp, email);
      res.status(200).send(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: "An unknown error occurred" });
      }
    }
  }

  async requestReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this._requestPasswordReset.execute(email);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).send({ message: error.message });
      } else {
        res.status(401).send({ message: "An unknown error occurred" });
      }
    }
  }

  

  async reset(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      const result = await this._resetPassword.execute(email, newPassword);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).send({ message: error.message });
      } else {
        res.status(401).send({ message: "An unknown error occurred" });
      }
    }
  }

  


  async otpResend(req: Request,res: Response){
    try{
      const { email } = req.body;

      const result = await this._resendOtp.execute(email);

      res.status(200).send(result)

    }catch (error: unknown) {
      
      if (error instanceof Error) {
        res.status(401).send({ message: error.message });
      } else {
        res.status(401).send({ message: "An unknown error occurred" });
      }
    }
  }



  async sendToken(req: Request, res: Response) {
    try {
      const RefreshToken = req.cookies.refreshToken;
    

      const tokens = await this._refreshToken.execute(RefreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.json({ accessToken: tokens.accessToken });
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        res.status(401).send({ message: error.message });
      } else {
        res.status(401).send({ message: "An unknown error occurred" });
      }
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken");
    res.status(200).send({ message: "You have successfully logged out." });
  }
}
