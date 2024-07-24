import { useState } from "react";
import CreateButton from "./CreateButton";
import SingleTeam from "./SingleTeam";

const TeamsAndPlayers = () => {
  const [availableTeams, setAvailableTeams] = useState([]);

  const onCreateNewTeamHandler = () => {
    const teamsTotalSum = availableTeams.length;

    if (teamsTotalSum >= 4) {
      return;
    }

    setAvailableTeams((prevState) => [
      ...prevState,
      { teamName: `Team ${teamsTotalSum + 1}` },
    ]);
  };

  return (
    <div
      className={
        "grid grid-cols-5 bg-blue-500 text-center w-[50%] h-[50%] rounded-[20px] gap-x-[20px] gap-y-[20px] px-[30px] py-[40px]"
      }
    >
      <div
        className={
          "col-span-1 flex flex-col justify-evenly items-center w-full h-full"
        }
      >
        <CreateButton
          title={"New Team"}
          size={60}
          onClickHandler={() => {
            onCreateNewTeamHandler();
          }}
          isDisabled={availableTeams.length >= 4}
        />
        <CreateButton
          title={"New Player"}
          size={60}
          onClickHandler={() => {}}
        />
      </div>
      <div
        className={
          "col-span-2 flex flex-col justify-start items-center text-center px-[5px] pb-[20px] gap-y-[20px]"
        }
      >
        <div className={"text-[35px] w-full"}>Teams</div>
        {availableTeams.length > 0 &&
          availableTeams.map((t) => {
            return <SingleTeam key={t.teamName} initialValue={t.teamName} />;
          })}
        {availableTeams.length === 0 && (
          <div
            className={
              "flex flex-col justify-center items-center text-center h-full text-[25px]"
            }
          >
            Create at least two teams
            <br /> to start the game!
            <div className={"pt-[10px]"}>Total available teams: 4</div>
          </div>
        )}
      </div>
      <div
        className={
          "col-span-2 flex flex-col justify-start items-center text-center px-[5px] pb-[20px] gap-y-[20px]"
        }
      >
        <div className={"text-[35px] w-full"}>Players</div>
        {availableTeams.length > 0 &&
          availableTeams.map((t) => {
            return <SingleTeam key={t.teamName} initialValue={t.teamName} />;
          })}
      </div>
    </div>
  );
};

export default TeamsAndPlayers;
