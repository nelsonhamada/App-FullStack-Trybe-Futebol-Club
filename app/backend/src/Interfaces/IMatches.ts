export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel {
  findAll: () => Promise<IMatch[]>;
  findAllByQuery: (query: string) => Promise<IMatch[]>;
}
