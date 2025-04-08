import express from "express";
import { PostController } from "../../api/controllers/Postcontroller";
import { ViewPosts } from "../../core/usecases/commonUseCase/ViewPosts";

import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { PostRepository } from "../infrastructure/repositories/PostRepository";
import { AddPost } from "../../core/usecases/commonUseCase/AddPost";


const router = express.Router();

const userRepository = new UserRepository();
const postRepository = new PostRepository();

const postController = new PostController(new ViewPosts(postRepository,userRepository),new AddPost(postRepository));


router.get("/posts", postController.getAllPosts.bind(postController));
router.post("/addPost", postController.createPost.bind(postController))

export default router;
