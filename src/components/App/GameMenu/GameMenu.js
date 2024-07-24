import MenuOption from "../MenuOption/MenuOption";

const GameMenu = () => {
  return (
    <div
      className={
        "flex flex-col bg-slate-300 shadow-2xl text-center rounded-[10px] gap-y-[50px] px-[200px] py-[70px]"
      }
    >
      <MenuOption title={"Start Game"} href={"/game"} />
      <MenuOption title={"Scoreboard"} href={"/scoreboard"} />
      <MenuOption title={"Settings"} href={"/settings"} />
      <MenuOption title={"About"} href={"/about"} />
    </div>
  );
};

export default GameMenu;
