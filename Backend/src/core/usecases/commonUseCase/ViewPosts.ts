import { IPostRepository } from "../../interfaces/IPostRepository";
import { IUserRepository } from "../../interfaces/IUserRepository";
// import { PostComment } from "../entities/Post";

export class ViewPosts {
  constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository
  ) {}

  async execute() {
    // Fetch posts
    const posts = await this.postRepository.findAll();

    if (!posts || posts.length === 0) {
      return { success: false, message: "No posts available" };
    }

    // const detailedPosts = await Promise.all(
    //   posts.map(async (post) => {
    //     if (post.ownerId) {
    //       const owner = await this.userRepository.findById(post.ownerId);

    //       if (owner) {
    //         return { ...post, OwnerId: owner.name };
    //       }
    //     }
    //     return post;
    //   })
    // );

    return {
      success: true,
      message: "Posts fetched successfully",
      posts: posts,
    };
  }

  
}
