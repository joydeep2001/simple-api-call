const userReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USERS":
      state = [...state, action.payload];
      return state;
    default:
      return state;
  }
};

export default userReducer;
