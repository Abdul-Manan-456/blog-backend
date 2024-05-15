import { Router } from "express";
import { BlogPostController } from "../controller";
import { blogPostCreate } from "../validations";
import { validator } from "../middleware";
export const router: Router = Router();
router.get("/", BlogPostController.getBlogPosts);
router.get("/:id", BlogPostController.getBlogPostById);
router.put("/:id", BlogPostController.updateBlogPost);
router.post("/", validator(blogPostCreate), BlogPostController.createBlogPost);
