import { Admin } from "../entities/Admin";

export interface IAdminRepository {
  save(admin: Admin): Promise<void>;
  findByEmail(email: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
}
