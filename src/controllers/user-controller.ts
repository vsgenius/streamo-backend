const userService = require('../services/user-service');
import type { Request, Response, NextFunction } from 'express';

const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // месяц

class UserController {
  async reqistration (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: MAX_AGE, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
  async activate(req: Request, res: Response, next: NextFunction) {
      try {
          console.log(req, res, next)
          const activateLink = req.params.link;
          await userService.activate(activateLink);
          if (process.env.CLIENT_URL)
          return res.redirect(process.env.CLIENT_URL)
      } catch (e) {
          console.log(e)
      }
  }
}

module.exports = new UserController();