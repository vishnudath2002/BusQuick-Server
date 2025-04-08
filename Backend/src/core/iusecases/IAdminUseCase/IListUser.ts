import { User } from "../../entities/User";

export interface IListUser {
  execute(role: string,searchQuery?: string,page?: number, limit?: number): Promise<{
    success: boolean;
    message: string;
    users?: User[];
  }>;
}
