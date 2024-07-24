import { useReducer, useState, useEffect } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import DifficultyContainer from "../../components/Game/Difficulty/DifficultyContainer";
import GameModeContainer from "../../components/Game/GameMode/GameModeContainer";
import { useNavigate } from "react-router-dom";
import TeamsAndPlayers from "../../components/Game/TeamsAndPlayers/TeamsAndPlayers";

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
    case "onPrevStep":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case "onNextStep":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const initialState = {
  gameMode: undefined,
  gameDifficulty: undefined,
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
    {
      title: "Create Teams & Players",
      element: <TeamsAndPlayers />,
    },
    // {
    //   title: "Select Game Difficulty",
    //   element: (
    //     <DifficultyContainer
    //       selectedGameDifficulty={state.gameDifficulty}
    //       onNewGameDifficultySelected={(newSelectedDifficulty) => {
    //         setErrorMessage({ isVisible: false, errorMessage: "" });

    //         dispatch({
    //           type: "changeGameDifficulty",
    //           newGameDifficulty: newSelectedDifficulty,
    //         });
    //       }}
    //     />
    //   ),
    // },
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

    if (state.currentStep === 1 && state.gameDifficulty === undefined) {
      setErrorMessage({
        isVisible: true,
        errorMessage: "You must select the Game Difficulty first!",
      });

      return;
    }

    // TO-DO --> COMPLETE FUNCTION

    if (state.currentStep >= GameModeObjectList.length - 1) {
      // TO-DO --> START THE GAME

      navigate("/");

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
