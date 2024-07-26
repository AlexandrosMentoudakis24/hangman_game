const GameStart = ({ gameState, gameObject }) => {
  const currentGameState = gameState;

  const availableTeams = gameObject.teams;

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-[20%] flex-col bg-red-500 text-white  text-[28px]">
          <div className={"flex flex-col h-full gap-y-[35px] p-[30px]"}>
            <div>Timer: </div>
            <div>Scoreboard</div>
            <div className={"flex flex-col text-[30px] gap-y-[35px]"}>
              <div>Team 1: 5</div>
              <div>Team 2: 10</div>
              <div>Team 3: 10</div>
              <div>Team 4: 10</div>
            </div>
          </div>
        </div>

        <div className="flex-[55%] bg-green-500 items-center justify-center text-white"></div>

        <div className="flex-[25%] bg-blue-500 items-center justify-center text-white"></div>
      </div>
      {/* <div className={"flex flex-col h-full w-full"}>
        <div className={"grid grid-cols-4 h-full w-full"}>
          <div className={"col-span-1 h-full bg-red-500"}>Score Board</div>
          <div className={"col-span-2 h-full bg-yellow-500"}>HangMan</div>
          <div className={"col-span-1 h-full bg-green-500"}>Playing Team</div>
        </div>
      </div> */}
    </>
  );
};

export default GameStart;
