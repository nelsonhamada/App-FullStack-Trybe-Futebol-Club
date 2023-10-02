import { IMatchModel } from '../Interfaces/IMatches';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    public matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(
    query: string | undefined = undefined,
  ) {
    if (query) {
      const allMatches = await this.matchModel.findAllByQuery(query);
      return { status: 'SUCCESFUL', data: allMatches };
    }
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESFUL', data: allMatches };
  }
}