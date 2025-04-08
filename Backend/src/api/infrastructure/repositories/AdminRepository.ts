import { IAdminRepository } from "../../../core/interfaces/IAdminRepository";
import { Admin } from "../../../core/entities/Admin";
import { Admins } from "../db/models/Admins";

export class AdminRepository implements IAdminRepository {
  async save(Admin: Admin): Promise<void> {
    const AdminToSave = new Admins(Admin);
    await AdminToSave.save();
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const AdminDoc = await Admins.findOne({ email }).exec();

    
    if (!AdminDoc) {
      return null;
    }

    return {
      id: AdminDoc._id.toString(), // Convert _id to string
      name: AdminDoc.name || '',
      email: AdminDoc.email || '',
      password: AdminDoc.password || '',
    };
  }

  async findById(id: string): Promise<Admin | null> {
    const AdminDoc = await Admins.findById(id).exec();

   
    if (!AdminDoc) {
      return null;
    }

    return {
      id: AdminDoc._id.toString(), 
      name: AdminDoc.name || '',
      email: AdminDoc.email || '',
      password: AdminDoc.password || ''
    };
  }
}
