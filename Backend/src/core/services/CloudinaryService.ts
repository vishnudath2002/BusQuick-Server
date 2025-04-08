import cloudinary from "../../api/infrastructure/config/cloudinary";

export class CloudinaryService {
  async uploadImage(filePath: string): Promise<string> {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "profile_pictures",
    });
    return result.secure_url; // Return Cloudinary URL
  }
}
