import GameMenu from "./components/GameMenu/GameMenu";

const App = () => {
  return (
    <div
      className={"flex flex-col justify-center items-center w-screen h-screen"}
    >
      <div className={"text-[40px] tracking-[2px] mb-[50px]"}>
        Save The Hangman
      </div>
      <GameMenu />
    </div>
  );
};

export default App;
