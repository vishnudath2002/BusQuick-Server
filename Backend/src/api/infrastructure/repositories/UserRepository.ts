import { IUserRepository } from "../../../core/interfaces/IUserRepository";
import { User } from "../../../core/entities/User";
import Users from "../db/models/Users";
import bcrypt from "bcrypt";

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    const userToSave = new Users(user);
    await userToSave.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await Users.findOne({ email }).exec();


    if (!userDoc) {
      return null;
    }

    return {
      id: userDoc._id.toString(), 
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      photo: userDoc.photo || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
      createdAt: userDoc.createdAt 
    };
  }

  async findByPhone(phone: string): Promise<User | null> {
    const userDoc = await Users.findOne({ phone }).exec();


    if (!userDoc) {
      return null;
    }

    return {
      id: userDoc._id.toString(), 
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      photo: userDoc.photo || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
      createdAt: userDoc.createdAt 
    };
  }

  async updateByEmail(email: string, updateData: Partial<User>): Promise<void> {
    await Users.updateOne({ email }, { $set: updateData }).exec();
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await Users.findById(id).exec();

    if (!userDoc) {
      return null;
    }

    return {
      id: userDoc._id.toString(), 
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      photo: userDoc.photo || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
      createdAt: userDoc.createdAt 
    };
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.updateOne({ email }, { $set: { password: hashedPassword } }).exec();
  }


  async editName(id: string, name: string): Promise<boolean> {
    const result = await Users.findByIdAndUpdate(id, { $set:{ name: name }});
    return result !== null; 
  }

  async editEmail(id: string, email: string): Promise<boolean> {
    const result = await Users.findByIdAndUpdate(id, { $set: { email: email }});
    return result !== null;
  }

  async editPhone(id: string, phone: string): Promise<boolean> {
    const result = await Users.findByIdAndUpdate(id, { $set:{ phone: phone }});
    return result !== null;
  }


  async changePassword(email: string, oldPassword: string, newPassword: string): Promise<{ message: string; status: boolean }> {
    const userDoc = await Users.findOne({ email }).exec();
    if (!userDoc || !userDoc.password) {
      return { message: "User not found or password not set.", status: false };
    }
  
    const isMatch = await bcrypt.compare(oldPassword, userDoc.password as string);
    if (!isMatch) {
      return { message: "Current password is incorrect.", status: false };
    }

    const isSamePassword = await bcrypt.compare(newPassword, userDoc.password as string);
  if (isSamePassword) {
    return { message: "New password cannot be the same as the current password.", status: false };
  }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.updateOne({ email }, { $set: { password: hashedPassword } }).exec();
  
    return { message: "Password changed successfully.", status: true };
  }
  

  async updateProfilePicture(id: string, photoUrl: string): Promise<User | null> {
    return Users.findByIdAndUpdate(id, { profilePicture: photoUrl }, { new: true });
  }
  

  async findByRole(
    role: string,
    searchQuery: string = '',
    page: number = 1,
    limit: number = 10
  ): Promise<User[] | null> {
    
    const skip = (page - 1) * limit;
  
    const searchRegex = new RegExp(searchQuery, 'i'); // case-insensitive search
  
    const userDocs = await Users.find({
      role,
      otpVerified: true,
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchQuery } // optional: make this exact or regex
      ]
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // newest first (optional)
  
    return userDocs.map((userDoc) => ({
      id: userDoc._id.toString(),
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      photo: userDoc.photo || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
      createdAt: userDoc.createdAt,
    }));
  }
  

  async toggleBlockStatus(id: string): Promise<User | null> {
    const userDoc = await Users.findById(id).exec();

    if (!userDoc) {
      throw new Error("User not found.");
    }


    userDoc.isBlocked = !userDoc.isBlocked; 

  
    await userDoc.save();


    return {
      id: userDoc._id.toString(),
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      photo: userDoc.photo || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked,
      otpVerified: userDoc.otpVerified || false,
      createdAt: userDoc.createdAt 
    };
  }

  async getEmailById(userId: string): Promise<string | null | undefined>{
    const userDoc = await Users.findById(userId).exec();
      if(!userDoc){
        return null;
      } 
    return userDoc.email;
  }

  
}
