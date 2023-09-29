import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  Validations.validateFields,
  (req: Request, res: Response) => userController.requestLogin(req, res),
);

export default router;
