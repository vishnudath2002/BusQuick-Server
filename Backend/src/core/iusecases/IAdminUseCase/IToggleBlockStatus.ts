import { User } from "../../entities/User";

export interface IToggleBlockStatus {
  execute(id: string): Promise<{
    success: boolean;
    message: string;
    owners?: User;
  }>;
}
