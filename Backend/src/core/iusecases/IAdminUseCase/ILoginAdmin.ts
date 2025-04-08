// import { Admin } from "../../entities/Admin";

export interface ILoginAdmin {
  execute(email: string, password: string): Promise<{
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }>;
}
