import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam, ITeamModel } from '../Interfaces/ITeam';

export default class TeamModel implements ITeamModel {
  public model = SequelizeTeam;

  async findAll() {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: ITeam['id']) {
    const team = await this.model.findOne({ where: { id } });
    if (team === null) return null;
    return team;
  }
}
