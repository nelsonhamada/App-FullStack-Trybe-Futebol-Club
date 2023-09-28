import SequelizeTeam from '../database/models/SequelizeTeam';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamModel {
  findAll: () => Promise<ITeam[]>;
  findById(id: ITeam['id']): Promise<ITeam | null>;
  model: typeof SequelizeTeam;
}
