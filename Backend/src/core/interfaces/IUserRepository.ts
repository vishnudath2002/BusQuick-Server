import { User } from "../entities/User";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updatePassword(email: string, newPassword: string): Promise<void>;
  changePassword(email: string, oldPassword: string, newPassword: string):  Promise<{ message: string; status: boolean }> ;
  updateByEmail(email: string, updateData: Partial<User>): Promise<void>;
  updateProfilePicture(id: string, photoUrl: string): Promise<User | null>;
  findByRole(role: string, searchQuery?: string,page?: number, limit?: number): Promise<User[] | null>;
  toggleBlockStatus(id : string): Promise<User | null>;
  getEmailById(userId: string): Promise<string | null | undefined>
}
