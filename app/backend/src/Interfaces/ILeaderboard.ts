export interface ICalculateResults {
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
}

export interface ICalculateGoals {
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
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
  name?: string,
  totalPoints: number,
  totalGames: number,
  efficiency: string,
}

// {
//   "name": "Avaí/Kindermann",
//   "totalPoints": 1,
//   "totalGames": 3,
//   "efficiency": "11.11",
//   "totalVictories": 0,
//   "totalDraws": 1,
//   "totalLosses": 2,
//   "goalsFavor": 3,
//   "goalsOwn": 7,
//   "goalsBalance": -4
// }
