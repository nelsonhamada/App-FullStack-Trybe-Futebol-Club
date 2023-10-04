import TeamModel from '../models/TeamModel';
import { ICalculateGoals,
  ICalculateResults,
  IHomeEdit,
  IHomeMatches } from '../Interfaces/ILeaderboard';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceReponse';

export default class LeaderboardService {
  constructor(
    public matchModel = new MatchModel(),
    public teamModel = new TeamModel(),
  ) { }

  public static calculateResults(team: IHomeMatches[]) {
    const resultTable: ICalculateResults = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    team.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        resultTable.totalDraws += 1;
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        resultTable.totalVictories += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        resultTable.totalLosses += 1;
      }
    });
    return resultTable;
  }

  public static calculateTotalGoals(team: IHomeMatches[]) {
    const homeTeamGoals: ICalculateGoals = {
      goalsFavor: 0,
      goalsOwn: 0,
    };

    team.forEach((match) => {
      homeTeamGoals.goalsFavor += match.homeTeamGoals;
      homeTeamGoals.goalsOwn += match.awayTeamGoals;
    });
    return homeTeamGoals;
  }

  public static editPatternLeaderboard(team: IHomeMatches[]) {
    const results = LeaderboardService.calculateResults(team);
    const goals = LeaderboardService.calculateTotalGoals(team);
    const points = (results.totalVictories * 3) + results.totalDraws;
    return {
      totalPoints: points,
      totalGames: team.length,
      ...results,
      ...goals,
    };
  }

  public async getHomeLeaderboard(): Promise<ServiceResponse<IHomeEdit[]>> {
    const allMatches = await this.matchModel.findAllByQuery('false');

    const finalLeaderboard = await Promise.all(allMatches
      .map(async (team) => {
        const teamMatches = await this.matchModel.findByHomeTeam(team.homeTeamId);
        const teamInstance = await this.teamModel.findById(team.homeTeamId);
        const teamName = teamInstance?.teamName ?? '';
        const editLeaderboard = LeaderboardService.editPatternLeaderboard(teamMatches);
        return { name: teamName, ...editLeaderboard };
      }));

    return { status: 'SUCCESSFUL', data: finalLeaderboard };
  }
}
