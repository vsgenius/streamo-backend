import type { Request, Response } from 'express';

const userService = require('../services/user-service');

const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // месяц

class UserController {
  static async reqistration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      return res.json({ error: 'ошибка регистрации' });
    }
  }

  static async activate(req: Request, res: Response) {
    try {
      const activateLink = req.params.link;
      await userService.activate(activateLink);
      if (process.env.CLIENT_URL) return res.redirect(process.env.CLIENT_URL);
      return res.json({ error: 'ошибка переадресации' });
    } catch (e) {
      return res.json({ error: 'ошибка активации' });
    }
  }
}

module.exports = new UserController();
