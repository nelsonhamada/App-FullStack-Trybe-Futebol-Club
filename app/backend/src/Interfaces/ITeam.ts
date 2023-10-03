import { Identifiable } from '.';
import SequelizeTeam from '../database/models/SequelizeTeam';

export interface ITeam extends Identifiable{
  teamName: string;
}

export interface ITeamModel {
  findAll: () => Promise<ITeam[]>;
  findById(id: ITeam['id']): Promise<ITeam | null>;
  model: typeof SequelizeTeam;
}
