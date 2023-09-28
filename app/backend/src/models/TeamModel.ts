import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam, ITeamModel } from '../Interfaces/ITeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll() {
    const teams = await this.model.findAll();
    return teams.map((team) => team.toJSON());
  }

  async findById(id: ITeam['id']) {
    const team = await this.model.findOne({ where: { id } });
    if (team === null) return null;
    return team.toJSON();
  }
}
