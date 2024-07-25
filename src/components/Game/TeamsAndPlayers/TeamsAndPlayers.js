import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";

import PlayersContainer from "./PlayersContainer";
import TeamsContainer from "./TeamsContainer";
import CreateButton from "./CreateButton";

const TeamsAndPlayers = ({
  activeTeams,
  onNewTeamCreateHandler,
  onTeamDeleteHandler,
  onTeamNameEditHandler,
  onNewPlayerCreateHandler,
  onPlayerDeleteHandler,
  onPlayerNameEditHandler,
}) => {
  const [selectedTeam, setSelectedTeam] = useState({
    teamId: undefined,
    teamName: undefined,
    players: [],
  });

  useEffect(() => {
    if (activeTeams.length > 0) {
      setSelectedTeam(activeTeams[0]);
    } else {
      setSelectedTeam({ teamId: undefined, teamName: undefined, players: [] });
    }
  }, [activeTeams]);

  const onCreateNewTeamHandler = () => {
    const teamsTotalSum = activeTeams.length;

    if (teamsTotalSum >= 4) {
      return;
    }

    const newTeamId = uuidv4();

    onNewTeamCreateHandler(newTeamId, "New Team");
  };

  return (
    <div
      className={
        "grid grid-cols-5 bg-blue-500 text-center w-[70%] h-[50%] rounded-[20px] gap-x-[20px] gap-y-[20px] px-[30px] py-[40px]"
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
          isDisabled={activeTeams.length >= 4}
        />
      </div>
      <div
        className={
          "col-span-2 flex flex-col justify-start items-center text-center px-[5px] pb-[20px] gap-y-[20px]"
        }
      >
        <TeamsContainer
          activeTeams={activeTeams}
          onTeamDeleteHandler={onTeamDeleteHandler}
          onTeamNameEditHandler={onTeamNameEditHandler}
          onTeamSelectHandler={(teamId) => {
            let foundTeam;

            try {
              foundTeam = activeTeams.find((t) => t.teamId === teamId);

              if (foundTeam === undefined) throw new Error("Team not found!");

              setSelectedTeam(foundTeam);
            } catch (error) {
              window.alert(error);
            }
          }}
        />
      </div>
      <div
        className={
          "col-span-2 flex flex-col justify-start items-center text-center px-[5px] pb-[20px] gap-y-[20px]"
        }
      >
        <PlayersContainer
          activePlayers={selectedTeam.players}
          selectedTeamId={selectedTeam.teamId}
          onNewPlayerCreateHandler={onNewPlayerCreateHandler}
          onPlayerDeleteHandler={onPlayerDeleteHandler}
          onPlayerNameEditHandler={onPlayerNameEditHandler}
        />
      </div>
    </div>
  );
};

export default TeamsAndPlayers;
