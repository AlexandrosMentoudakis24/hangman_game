import { GameMode } from "../../../models/GameModel";
import GameModeCard from "./GameModeCard";

const GameModeContainer = ({ selectedGameMode, onNewGameModeSelected }) => {
  const changeSelectedCard = (newSelectedTitle) => {
    onNewGameModeSelected(newSelectedTitle);
  };

  return (
    <div
      className={
        "flex flex-row flex-wrap justify-center items-center bg-blue-500 text-center w-[70%] h-[50%] rounded-[20px] gap-x-[20px] gap-y-[20px] p-[30px]"
      }
    >
      {Object.values(GameMode).map((mode) => {
        return (
          <GameModeCard
            key={mode}
            title={mode}
            onCardTapHanlder={changeSelectedCard}
            isSelected={selectedGameMode === mode}
          />
        );
      })}
    </div>
  );
};

export default GameModeContainer;
