export interface IPasswordReset {
    execute(email: string): Promise<{
      success: boolean;
      message: string;
    }>;
  }
  
