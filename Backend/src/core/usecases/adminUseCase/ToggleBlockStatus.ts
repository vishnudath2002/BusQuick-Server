
import { IUserRepository } from "../../interfaces/IUserRepository";
// import { PostComment } from "../entities/Post";

export class ToggleBlockStatus {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {

    const user = await this.userRepository.toggleBlockStatus(id);

    if (!user) {
      return { success: false, message: "No user" };
    }

    return {
      success: true,
      message: "status changed successfully",
      owners: user,
    };
  }

  
}
