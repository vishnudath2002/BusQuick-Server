import { Post } from "../../entities/Post";

export interface IViewPosts {
  execute(): Promise<{
    success: boolean;
    message: string;
    posts?: Post[];
  }>;
}
