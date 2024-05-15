import { PrismaClient } from "@prisma/client";
import Service from "./Service";
import { BlogPostCreate } from "../interfaces";

const prisma = new PrismaClient();
const { post } = prisma;
class AuthService extends Service {
  constructor() {
    super();
  }

  // ---------------   CREATE --------------

  async createBlogPost(reqBody: BlogPostCreate) {
    try {

      const blogPost = await post.create({ data: reqBody });
      return this.response({ code: 201, message: "Created Successfully", data: blogPost });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   GET ALL --------------

  async getBlogPost() {
    try {
      const blogPost = await post.findMany();
      return this.response({ code: 200, message: "Get successfully", data: blogPost });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   GET BY ID --------------

  async getBlogPostById(id: string) {
    try {
      const blogPost = await post.findUnique({ where: { id } });
      // if record not found
      if (!blogPost) return this.response({ code: 200, message: "No Record Found", data: null })
      // if the record found
      else return this.response({ code: 200, message: "Get successfully", data: blogPost });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   DELETE POST --------------

  async deleteBlogPost(id: string) {
    try {
      const blogPost = await post.findUnique({ where: { id } });
      // if record not found
      if (!blogPost) return this.response({ code: 200, message: "No Record Found", data: null })
      // Deleteing the blog post
      const deletedBlog = await post.delete({ where: { id } });
      // if the record found
      return this.response({ code: 200, message: "Delete successfully", data: deletedBlog });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   UPDATE POST --------------

  async updateBlogPost(id: string, reqBody: BlogPostCreate) {
    try {
      const blogPost = await post.findUnique({ where: { id } });
      // If record not found
      if (!blogPost) return this.response({ code: 200, message: "No Record Found", data: null })
      // Updating the blog post
      const updateBlog = await post.update({ where: { id }, data: reqBody });
      return this.response({ code: 200, message: "Update successfully", data: updateBlog });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new AuthService();
