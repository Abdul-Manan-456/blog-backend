import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services";
import logger from "../utils/winston";

class UserController {
  constructor() {}
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.createUser(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.login(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}

export default new UserController();
