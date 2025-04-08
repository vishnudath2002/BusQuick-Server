import { IPostRepository } from "../interfaces/IPostRepository";
import { Post } from "../entities/Post";

export class PostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async createPost(post: Post): Promise<void> {
    await this.postRepository.save(post);
  }

  async viewPosts(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }

  async viewPostsByCategory(category: string): Promise<Post[]> {
    return await this.postRepository.findAllByCategory(category);
  }

  async likePost(postId: string, userId: string): Promise<void> {
    await this.postRepository.likePost(postId, userId);
  }

  // async addComment(postId: string, comment: PostComment ): Promise<void> {
  //   await this.postRepository.addComment(postId, comment);
  // }
}
