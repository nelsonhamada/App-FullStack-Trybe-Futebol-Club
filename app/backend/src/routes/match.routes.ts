import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => { matchController.getAllMatches(req, res); });

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateProgress(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  Validations.validateScoreboard,
  (req: Request, res: Response) => matchController.updateScoreboard(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateNewMatch,
  (req: Request, res:Response) => matchController.createNewMatch(req, res),
);

export default router;
