import { IPostRepository } from "../../interfaces/IPostRepository";
import { Post } from "../../entities/Post";

export class AddPost {
  constructor(
    private postRepository: IPostRepository
  ) {}

  async execute(post: Post) {
    // Fetch posts
    const result = await this.postRepository.save(post);

  

    if (result === null) {
      return { success: false, message: "No posts available" };
    }



    return {
      success: true,
      message: "Post successfully created",
    };
  }
}
