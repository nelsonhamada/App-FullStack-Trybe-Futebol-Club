import { ITeamModel } from '../Interfaces/ITeam';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    public teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number) {
    const team = await this.teamModel.findById(id);
    if (team === null) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
