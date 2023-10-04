import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './users.routes';
import matchRouter from './match.routes';
import leaderboardRouter from './leaderboard';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
