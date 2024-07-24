import MenuOption from "../MenuOption/MenuOption";

const GameMenu = () => {
  return (
    <div
      className={
        "flex flex-col bg-slate-300 shadow-2xl rounded-[10px] gap-y-[50px] px-[200px] py-[70px]"
      }
    >
      <MenuOption title={"Start Game"} href={"/"} />
      <MenuOption title={"Scoreboard"} href={"/"} />
      <MenuOption title={"Settings"} href={"/"} />
      <MenuOption title={"About"} href={"/"} />
    </div>
  );
};

export default GameMenu;
