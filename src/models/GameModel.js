const GameMode = {
  singleMode: "Single Mode",
  multiplayer: "Multiplayer",
};

const GameDifficulty = {
  easy: "Easy",
  intermediate: "Intermediate",
  hard: "Hard",
};

class GameModel {
  constructor(gameMode, gameDifficulty, teams) {
    this.gameMode = gameMode;
    this.gameDifficulty = gameDifficulty;
    this.teams = teams;
  }

  changeGameMode(newGameMode) {
    this.gameMode = newGameMode;
  }

  changeDifficulty(newGameDifficulty) {
    this.gameDifficulty = newGameDifficulty;
  }

  addNewTeam(newTeam) {
    this.teams = [...this.teams, newTeam];
  }
}

class Team {
  constructor(teamId, teamName, players) {
    this.teamId = teamId;
    this.teamName = teamName;
    this.players = players;
  }

  addNewPlayer(newPlayer) {
    this.players = [...this.players, newPlayer];
  }
}

class Player {
  constructor(playerId, playerName) {
    this.playerId = playerId;
    this.playerName = playerName;
  }

  addNewPlayer(newPlayer) {
    this.players = [...this.players, newPlayer];
  }
}

exports.GameModel = GameModel;
exports.Team = Team;
exports.Player = Player;
exports.GameMode = GameMode;
exports.GameDifficulty = GameDifficulty;
