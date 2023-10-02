import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    if (req.query.inProgress === 'true') {
      const serviceResponse = await this.matchService.getAllMatches('1');
      return res.status(200).json(serviceResponse.data);
    }
    if (req.query.inProgress === 'false') {
      const serviceResponse = await this.matchService.getAllMatches('0');
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }
}
