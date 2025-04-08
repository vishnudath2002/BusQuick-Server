import { Post } from "../entities/Post";

export interface IPostRepository {
  save(post: Post): Promise<void>;
  // findById(postId: string): Promise<Post | null>;
  findAllByCategory(category: string): Promise<Post[]>;
  findAll(): Promise<Post[]>;
  likePost(postId: string, userId: string): Promise<void>;
  // addComment(postId: string, comment: Comment): Promise<void>;
}
