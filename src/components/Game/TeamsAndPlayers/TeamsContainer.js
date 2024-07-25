import SingleTeam from "./SingleTeam";

const TeamsContainer = ({
  activeTeams,
  onTeamDeleteHandler,
  onTeamNameEditHandler,
  onTeamSelectHandler,
}) => {
  return (
    <>
      <div className={"text-[35px] w-full"}>Teams</div>
      {activeTeams.length > 0 &&
        activeTeams.map((t) => {
          return (
            <SingleTeam
              key={t.teamId}
              teamId={t.teamId}
              initialValue={t.teamName}
              onTeamDelete={onTeamDeleteHandler}
              onTeamNameEdit={onTeamNameEditHandler}
              onTeamSelect={onTeamSelectHandler}
            />
          );
        })}
      {activeTeams.length === 0 && (
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
    </>
  );
};

export default TeamsContainer;
