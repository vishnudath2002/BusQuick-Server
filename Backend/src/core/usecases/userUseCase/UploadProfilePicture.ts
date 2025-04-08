import { IUserRepository } from "../../interfaces/IUserRepository";
import { CloudinaryService } from "../../services/CloudinaryService";

export class UploadProfilePicture {
  constructor(
    private userRepository: IUserRepository,
    private cloudinaryService: CloudinaryService
  ) {}

  async execute(userId: string, filePath: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const photoUrl = await this.cloudinaryService.uploadImage(filePath);
    return this.userRepository.updateProfilePicture(userId, photoUrl);
  }
}
