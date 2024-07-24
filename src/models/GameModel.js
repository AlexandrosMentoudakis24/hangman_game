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

exports.GameModel = GameModel;
exports.GameMode = GameMode;
exports.GameDifficulty = GameDifficulty;
