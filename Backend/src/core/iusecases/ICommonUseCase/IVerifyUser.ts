export interface IVerifyUser {
    execute(otp: string, email: string): Promise<{
      success: boolean;
      message: string;
    }>;
  }
  