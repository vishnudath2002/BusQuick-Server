import { Post } from "../../entities/Post";

export interface IAddPost {
  execute(post: Post): Promise<{
    success: boolean;
    message: string;
  }>;
}
