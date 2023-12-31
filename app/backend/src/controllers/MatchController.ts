import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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
    return res.status(200).json(serviceResponse.data);
  }

  public async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateProgress(Number(id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async updateScoreboard(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateScoreboard(Number(id), req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async createNewMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.creatNewMatch(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
  }
}
