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
      goalsBalance: 0,
    };

    team.forEach((match) => {
      homeTeamGoals.goalsFavor += match.homeTeamGoals;
      homeTeamGoals.goalsBalance += match.homeTeamGoals;
      homeTeamGoals.goalsOwn += match.awayTeamGoals;
      homeTeamGoals.goalsBalance -= match.awayTeamGoals;
    });
    return homeTeamGoals;
  }

  public static toSort(team: IHomeEdit[]) {
    return team.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public static editPatternLeaderboard(team: IHomeMatches[]) {
    const results = LeaderboardService.calculateResults(team);
    const goals = LeaderboardService.calculateTotalGoals(team);
    const points = (results.totalVictories * 3) + results.totalDraws;
    return {
      totalPoints: points,
      totalGames: team.length,
      efficiency: ((points / (team.length * 3)) * 100).toFixed(2),
      ...results,
      ...goals,
    };
  }

  public async getHomeLeaderboard(): Promise<ServiceResponse<IHomeEdit[]>> {
    // const allMatches = await this.matchModel.findAllByQuery('false');
    const allTeams = await this.teamModel.findAll();

    const finalLeaderboard = await Promise.all(allTeams
      .map(async (team) => {
        const teamMatches = await this.matchModel.findByHomeTeam(team.id);
        const teamInstance = await this.teamModel.findById(team.id);
        const teamName = teamInstance?.teamName ?? '';
        const editLeaderboard = LeaderboardService.editPatternLeaderboard(teamMatches);
        return { name: teamName, ...editLeaderboard };
      }));
    const sortLeaderboard = LeaderboardService.toSort(finalLeaderboard);

    return { status: 'SUCCESSFUL', data: sortLeaderboard };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<IHomeEdit[]>> {
    // const allMatches = await this.matchModel.findAllByQuery('false');
    const allTeams = await this.teamModel.findAll();

    const finalLeaderboard = await Promise.all(allTeams
      .map(async (team) => {
        const teamMatches = await this.matchModel.findByAwayTeam(team.id);
        const teamInstance = await this.teamModel.findById(team.id);
        const teamName = teamInstance?.teamName ?? '';
        const editLeaderboard = LeaderboardService.editPatternLeaderboard(teamMatches);
        return { name: teamName, ...editLeaderboard };
      }));
    const sortLeaderboard = LeaderboardService.toSort(finalLeaderboard);

    return { status: 'SUCCESSFUL', data: sortLeaderboard };
  }
}
