import { Identifiable, NewEntity } from '.';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchModel {
  findById: (id: IMatch['id']) => Promise<IMatch | null>;
  findAll: () => Promise<IMatch[]>;
  findAllByQuery: (query: string) => Promise<IMatch[]>;
  update: (id: IMatch['id'], data: Partial<NewEntity<IMatch>>) => Promise<IMatch | null>;
}
