import TeamModel from '../models/TeamModel';
import { NewEntity } from '../Interfaces';
import { IMatch, IMatchScore } from '../Interfaces/IMatches';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    public matchModel = new MatchModel(),
    public teamModel = new TeamModel(),
  ) { }

  public async getAllMatches(
    query: string | undefined = undefined,
  ) {
    if (query) {
      const allMatches = await this.matchModel.findAllByQuery(query);
      return { status: 'SUCCESSFUL', data: allMatches };
    }
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateProgress(matchId: number) {
    const match = await this.matchModel.findById(matchId);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    const { id, inProgress, ...rest } = match;
    await this.matchModel.update(id, { inProgress: false, ...rest });
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateScoreboard(matchId: number, data:IMatchScore) {
    const match = await this.matchModel.findById(matchId);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    const { id } = match;
    await this.matchModel.update(id, data);
    return { status: 'SUCCESSFUL', data: { message: 'Updated Scoreboard' } };
  }

  public async creatNewMatch(data: NewEntity<IMatch>) {
    const homeTeam = await this.teamModel.findById(Number(data.homeTeamId));
    const awayTeam = await this.teamModel.findById(Number(data.awayTeamId));
    if (homeTeam === null || awayTeam === null) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.create(data);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
