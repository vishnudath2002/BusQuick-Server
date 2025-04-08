export interface IResetPassword {
    execute(email: string, newPassword: string): Promise<{
      success: boolean;
      message: string;
    }>;
  }
  