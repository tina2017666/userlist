const iniState = {
  content: [],
  page: 0
};

const useracts = (state = iniState, action) => {
  switch (action.type) {
    case "GETDATA":
      return {
        ...state,
        content: [...action.data]
        //page: 0
        // content:action.data
      };
    case "GET_PRE":
      return {
        // content: state.content,
        // page: action.data - 1
        ...state,
        page: action.data - 1
      };
    case "GET_NEXT":
      return {
        // content: state.content,
        // page: action.data + 1
        ...state,
        page: action.data + 1
      };
    case "GET_INIT":
      return {
        // content: state.content,
        // page: 0
        ...state,
        page: 0
      };
    case "GET_PAGE":
      return { ...state };
    default:
      return state;
  }
};

export default useracts;
