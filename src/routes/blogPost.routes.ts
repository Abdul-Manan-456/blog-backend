import { Router } from "express";
import { BlogPostController } from "../controller";
import { blogPostCreate } from "../validations";
import { authMiddleware, validator } from "../middleware";
export const router: Router = Router();
router.get("/", authMiddleware, BlogPostController.getBlogPosts);
router.get("/:id", BlogPostController.getBlogPostById);
router.put("/:id", BlogPostController.updateBlogPost);
router.post("/", validator(blogPostCreate), BlogPostController.createBlogPost);
