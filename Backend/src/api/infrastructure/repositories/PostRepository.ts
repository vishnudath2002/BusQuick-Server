import { IPostRepository } from "../../../core/interfaces/IPostRepository";
import { Post } from "../../../core/entities/Post";
import Posts from "../db/models/Posts";
// import mongoose from "mongoose";


export class PostRepository implements IPostRepository{
  // constructor(private readonly postRepository: IPostRepository) {}

  async save(post: Post): Promise<void> {
   const postToSave =  new Posts(post);
   await postToSave.save();
  }

  async findAll(): Promise<Post[]> {
    return await Posts.find();
  }

  async findAllByCategory(category: string): Promise<Post[]> {
    return await Posts.find({category});
  }

  async likePost(postId: string, userId: string): Promise<void> {
    const post = await Posts.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }
  

    if (!post.Likes) {
      post.Likes = [];
    }
  
   
    // const userObjectId = new mongoose.Types.ObjectId(userId);

    // // Check if the user has already liked the post
    // if (post.Likes.some((id) => id.equals(userObjectId))) {
    //   throw new Error("User already liked this post");
    // }
  
    // // Add the userId as an ObjectId to the Likes array
    // post.Likes.push(userObjectId);
  
   
    await post.save();

  }

  // async addComment(postId: string, comment: PostComment): Promise<void> {
  //   await this.postRepository.addComment(postId, comment);
  // }
}
