export interface ICalculateResults {
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
}

export interface ICalculateGoals {
  goalsFavor: number,
  goalsOwn: number,
}

export interface IHomeMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IHomeEdit extends ICalculateResults, ICalculateGoals {
  name: string,
  totalPoints: number,
  totalGames: number,
}
