const init_state = {
  username: "",
  fullName: "",
  email: "",
  role: "",
  id: 0,
  errMsg: "",
  storageIsChecked: false, // protection either logged in or no login it needs to be true.
  usernameProtect: true
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
      case "USER_PROTECT":
        return { ...state, errMsg: action.payload, usernameProtect: false  };
        case "EMAIL_PROTECT":
          return { ...state, errMsg: action.payload, usernameProtect: false  };
    default:
      return state;
  }
};

export default reducer;
