const GameStateReducer = (state, action) => {
  switch (action.type) {
    case "changeGameState":
      return {
        state: action.newGameState,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export default GameStateReducer;
