import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(serviceResponse.data);
  }

  public async getAwayLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAwayLeaderboard();
    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamsLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getTeamsLeaderboard();
    return res.status(200).json(serviceResponse.data);
  }
}
