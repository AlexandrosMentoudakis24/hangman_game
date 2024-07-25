import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import DifficultyContainer from "../../components/Game/Difficulty/DifficultyContainer";
import TeamsAndPlayers from "../../components/Game/TeamsAndPlayers/TeamsAndPlayers";
import GameModeContainer from "../../components/Game/GameMode/GameModeContainer";
import { GameMode } from "../../models/GameModel";
import GameReducer from "../../reducers/GameReducer";

const initialState = {
  gameMode: undefined,
  gameDifficulty: undefined,
  teams: [],
  currentStep: 0,
};

const Game = () => {
  const [state, dispatch] = useReducer(GameReducer, initialState);
  const [errorMessage, setErrorMessage] = useState({
    isVisible: false,
    errorMessage: "",
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const navigate = useNavigate();

  const secondStage = [
    {
      title: "Select Game Difficulty",
      element: (
        <DifficultyContainer
          selectedGameDifficulty={state.gameDifficulty}
          onNewGameDifficultySelected={(newSelectedDifficulty) => {
            setErrorMessage({ isVisible: false, errorMessage: "" });

            dispatch({
              type: "changeGameDifficulty",
              newGameDifficulty: newSelectedDifficulty,
            });
          }}
        />
      ),
    },
    {
      title: "Create Teams & Players",
      element: (
        <TeamsAndPlayers
          activeTeams={state.teams}
          onNewTeamCreateHandler={(newTeamId, newTeamName) => {
            setErrorMessage({ isVisible: false, errorMessage: "" });

            dispatch({
              type: "addNewTeam",
              newTeamId: newTeamId,
              newTeamName: newTeamName,
            });
          }}
          onTeamDeleteHandler={(teamId) => {
            dispatch({
              type: "deleteTeam",
              teamId: teamId,
            });
          }}
          onTeamNameEditHandler={(teamId, newTeamName) => {
            dispatch({
              type: "editTeamName",
              teamId: teamId,
              newTeamName: newTeamName,
            });
          }}
          onNewPlayerCreateHandler={(teamId, newPlayerId, newPlayerName) => {
            setErrorMessage({ isVisible: false, errorMessage: "" });

            dispatch({
              type: "addNewPlayer",
              selectedTeamId: teamId,
              newPlayerId: newPlayerId,
              newPlayerName: newPlayerName,
            });
          }}
          onPlayerDeleteHandler={(teamId, playerId) => {
            dispatch({
              type: "deletePlayer",
              selectedTeamId: teamId,
              playerId: playerId,
            });
          }}
          onPlayerNameEditHandler={(teamId, playerId, newPlayerName) => {
            dispatch({
              type: "editPlayerName",
              selectedTeamId: teamId,
              playerId: playerId,
              newPlayerName: newPlayerName,
            });
          }}
        />
      ),
    },
  ];

  const GameModeObjectList = [
    {
      title: "Select Game Mode",
      element: (
        <GameModeContainer
          selectedGameMode={state.gameMode}
          onNewGameModeSelected={(newGameMode) => {
            setErrorMessage({ isVisible: false, errorMessage: "" });

            dispatch({
              type: "changeGameMode",
              newGameMode: newGameMode,
            });
          }}
        />
      ),
    },
    secondStage[state.gameMode === GameMode.multiplayer ? 1 : 0],
  ];

  const currentTitle = GameModeObjectList[state.currentStep].title;
  const currentElement = GameModeObjectList[state.currentStep].element;

  const onPrevStepHandler = () => {
    if (state.currentStep === 0) return;

    if (errorMessage.isVisible) {
      setErrorMessage({
        isVisible: false,
        errorMessage: "",
      });
    }

    dispatch({
      type: "onPrevStep",
    });
  };

  const onNextStepHandler = () => {
    if (state.currentStep === 0 && state.gameMode === undefined) {
      setErrorMessage({
        isVisible: true,
        errorMessage: "You must select the Game Mode first!",
      });

      return;
    }

    if (state.currentStep === 1) {
      if (
        state.gameMode === GameMode.singleMode &&
        state.gameDifficulty === undefined
      ) {
        setErrorMessage({
          isVisible: true,
          errorMessage: "You must select the Game Difficulty first!",
        });

        return;
      }

      if (state.gameMode === GameMode.multiplayer && state.teams.length < 2) {
        setErrorMessage({
          isVisible: true,
          errorMessage: "You must create at least 2 teams to play!",
        });

        return;
      }
    }

    // TO-DO --> COMPLETE FUNCTION

    if (state.currentStep >= GameModeObjectList.length - 1) {
      // TO-DO --> START THE GAME

      let isTeamPlayersListEmpty = false;

      for (let index = 0; index < state.teams.length; index++) {
        const players = state.teams[index].players;

        if (players.length === 0) {
          isTeamPlayersListEmpty = true;

          break;
        }
      }

      if (isTeamPlayersListEmpty) {
        setErrorMessage({
          isVisible: true,
          errorMessage: "Every existing team must have at least one player!",
        });

        return;
      }

      navigate("/playing");

      return;
    }

    dispatch({
      type: "onNextStep",
    });
  };

  return (
    <div className={"relative"}>
      <button
        onClick={() => {
          navigate("/");
        }}
        className={
          "flex flex-row text-center items-center hover:text-slate-400 active:text-slate-500 absolute top-[30px] left-[50px] text-[25px]"
        }
      >
        <FaArrowLeft size={22} />
        <span className={"ml-[12px]"}>Go Back</span>
      </button>
      <div
        className={
          "flex flex-col justify-center items-center w-screen h-screen"
        }
      >
        <div
          className={
            "tracking-[1px] text-[40px] underline underline-offset-[5px] mb-[50px]"
          }
        >
          {currentTitle}
        </div>
        {errorMessage.isVisible && (
          <div className={"text-[35px] text-rose-600 mb-[20px]"}>
            {errorMessage.errorMessage}
          </div>
        )}
        {currentElement}
        <div
          className={`flex flex-row ${
            state.currentStep === 0 ? "justify-end" : "justify-between"
          } items-center w-[50%] mt-[30px]`}
        >
          {state.currentStep !== 0 && (
            <button
              onClick={onPrevStepHandler}
              className={
                "flex flex-row hover:text-slate-400 active:text-slate-500 jsutify-center items-center text-[30px]"
              }
            >
              <FaArrowLeft />
              <span className={"ml-[10px]"}>Previous</span>
            </button>
          )}
          <button
            onClick={onNextStepHandler}
            className="flex flex-row jsutify-center items-center hover:text-slate-400 active:text-slate-500 text-[30px]"
          >
            <span className={"mr-[10px]"}>
              {state.currentStep >= GameModeObjectList.length - 1
                ? "Start Game"
                : "Next"}
            </span>
            {!state.currentStep >= GameModeObjectList.length - 1 && (
              <FaArrowRight />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
