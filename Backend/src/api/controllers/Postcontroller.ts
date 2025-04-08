import { Request, Response } from 'express';
import { IViewPosts } from '../../core/iusecases/ICommonUseCase/IViewPosts';
import { IAddPost } from '../../core/iusecases/ICommonUseCase/IAddPost';


export class PostController {
  constructor(
    private _viewPosts: IViewPosts,
    private _addPost: IAddPost      
  ) {}

  async getAllPosts(req: Request, res: Response) {

    const postList = await this._viewPosts.execute()
    
    res.status(200).json(postList);
  }

  async createPost(req: Request, res: Response){

    const { post } = req.body;

    const result = await this._addPost.execute(post);

    res.status(200).json(result)
  }


}
