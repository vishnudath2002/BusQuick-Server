export interface IResendOtp {
    execute(email: string): Promise<{
      success: boolean;
      message: string;
    }>;
  }
  