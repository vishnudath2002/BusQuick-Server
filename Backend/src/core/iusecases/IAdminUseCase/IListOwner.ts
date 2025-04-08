import { User } from "../../entities/User";

export interface IListOwner {
  execute(): Promise<{
    success: boolean;
    message: string;
    owners?: User[];
  }>;
}
