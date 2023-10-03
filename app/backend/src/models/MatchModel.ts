import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatche';
import { IMatch, IMatchModel } from '../Interfaces/IMatches';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  public model = SequelizeMatch;

  async findById(id: IMatch['id']) {
    const match = await this.model.findOne({ where: { id } });
    return match;
  }

  async findAll() {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async findAllByQuery(query: string) {
    const matches = await this.model.findAll({
      where: { inProgress: query },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null> {
    await this.model.update(data, { where: { id } });
    return this.findById(id);
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const finalObject = { ...data, inProgress: true };
    const newMatch = await this.model.create(finalObject);

    return newMatch;
  }
}
