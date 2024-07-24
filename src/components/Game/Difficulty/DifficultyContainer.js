import { GameDifficulty } from "../../../models/GameModel";
import DifficultyCard from "./DifficultyCard";

const DifficultyContainer = ({
  selectedGameDifficulty,
  onNewGameDifficultySelected,
}) => {
  const changeSelectedCard = (newSelectedDifficulty) => {
    if (selectedGameDifficulty === newSelectedDifficulty) return;

    onNewGameDifficultySelected(newSelectedDifficulty);
  };

  return (
    <div
      className={
        "flex flex-row flex-wrap justify-center items-center bg-blue-500 text-center w-[50%] h-[50%] rounded-[20px] gap-x-[20px] gap-y-[20px] p-[30px]"
      }
    >
      {Object.values(GameDifficulty).map((difficulty) => {
        return (
          <DifficultyCard
            key={difficulty}
            title={difficulty}
            onCardTapHanlder={changeSelectedCard}
            isSelected={selectedGameDifficulty === difficulty}
          />
        );
      })}
    </div>
  );
};

export default DifficultyContainer;
