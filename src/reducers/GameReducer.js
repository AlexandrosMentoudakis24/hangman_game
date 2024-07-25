import { GameMode } from "../models/GameModel";

const GameReducer = (state, action) => {
  switch (action.type) {
    case "changeGameMode":
      return {
        ...state,
        gameMode: action.newGameMode,
      };
    case "changeGameDifficulty":
      return {
        ...state,
        gameDifficulty: action.newGameDifficulty,
      };
    case "addNewTeam":
      const newTeamId = action.newTeamId;
      const newTeamName = action.newTeamName;

      return {
        ...state,
        teams: [
          ...state.teams,
          { teamId: newTeamId, teamName: newTeamName, players: [] },
        ],
      };
    case "deleteTeam":
      const teamId = action.teamId;

      const copiedStateTeams = [...state.teams];

      const formattedCopiedStateTeams = copiedStateTeams.filter(
        (t) => t.teamId !== teamId
      );

      return {
        ...state,
        teams: [...formattedCopiedStateTeams],
      };
    case "editTeamName":
      const formattedStateTeams = [...state.teams];

      const foundTeamIndex = formattedStateTeams.findIndex(
        (el) => el.teamId === action.teamId
      );

      if (foundTeamIndex === -1) return;

      formattedStateTeams[foundTeamIndex].teamName = action.newTeamName;

      return {
        ...state,
        teams: [...formattedStateTeams],
      };
    case "onPrevStep":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case "onNextStep":
      const formattedTeams =
        state.currentStep === 0 &&
        state.gameMode !== GameMode.multiplayer &&
        state.teams.length > 0
          ? []
          : [...state.teams];

      return {
        ...state,
        currentStep: state.currentStep + 1,
        teams: formattedTeams,
      };
    case "addNewPlayer":
      const selectedTeamId = action.selectedTeamId;
      const newPlayerId = action.newPlayerId;
      const newPlayerName = action.newPlayerName;

      const newPlayer = { playerId: newPlayerId, playerName: newPlayerName };

      for (let i = 0; i < state.teams.length; i++) {
        if (state.teams[i].teamId === selectedTeamId) {
          const foundPlayerIndex = state.teams[i].players.findIndex(
            (p) => p.playerId === newPlayerId
          );

          if (foundPlayerIndex !== -1) {
            break;
          }

          state.teams[i].players.push(newPlayer);

          break;
        }
      }

      return {
        ...state,
      };
    case "deletePlayer":
      const sTeamId = action.selectedTeamId;
      const playerId = action.playerId;

      for (let i = 0; i < state.teams.length; i++) {
        if (state.teams[i].teamId === sTeamId) {
          state.teams[i].players = [
            ...state.teams[i].players.filter((p) => p.playerId !== playerId),
          ];

          break;
        }
      }

      return {
        ...state,
      };
    case "editPlayerName":
      const fTeamId = action.selectedTeamId;
      const fPlayerId = action.playerId;
      const edittedPlayerName = action.newPlayerName;

      for (let i = 0; i < state.teams.length; i++) {
        if (state.teams[i].teamId === fTeamId) {
          for (let x = 0; x < state.teams[i].players.length; x++) {
            if (state.teams[i].players[x].playerId === fPlayerId) {
              state.teams[i].players[x].playerName = edittedPlayerName;

              break;
            }
          }

          break;
        }
      }

      return {
        ...state,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export default GameReducer;
