import { v4 as uuidv4 } from "uuid";

import SinglePlayer from "./SinglePlayer";

const PlayersContainer = ({
  activePlayers,
  selectedTeamId,
  onNewPlayerCreateHandler,
  onPlayerDeleteHandler,
  onPlayerNameEditHandler,
}) => {
  const onCreateNewTeamHandler = () => {
    const playersTotalSum = activePlayers.length;

    if (playersTotalSum >= 4) {
      return;
    }

    const newPlayerId = uuidv4();

    onNewPlayerCreateHandler(selectedTeamId, newPlayerId, "New Player");
  };

  return (
    <>
      <div className={"text-[35px] w-full"}>Players</div>
      {activePlayers &&
        activePlayers.length > 0 &&
        activePlayers.map((p) => {
          return (
            <SinglePlayer
              key={p.playerId}
              playerId={p.playerId}
              selectedTeamId={selectedTeamId}
              initialValue={p.playerName}
              onPlayerDelete={onPlayerDeleteHandler}
              onPlayerNameEdit={onPlayerNameEditHandler}
            />
          );
        })}
      {selectedTeamId && activePlayers.length < 4 && (
        <button
          onClick={onCreateNewTeamHandler}
          className={
            "w-full text-[25px] tracking-[1px] border-[5px] border-black text-black hover:text-white hover:border-white active:text-slate-600 active:border-slate-600 bg-transparent px-[10px] py-[5px]"
          }
        >
          Add New Player
        </button>
      )}
      {activePlayers && activePlayers.length === 0 && (
        <div
          className={
            "flex flex-col justify-center items-center text-center h-full text-[25px]"
          }
        >
          Every team must have at least one player to start the game!
        </div>
      )}
    </>
  );
};

export default PlayersContainer;
