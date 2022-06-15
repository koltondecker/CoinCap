import { createContext, useReducer, useContext } from "react";

interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  isAuthenticated: string;
}

const UserContext = createContext({
  id: "",
  userName: "",
  firstName: "",
  lastName: "",
  isAuthenticated: "false",
});
const { Provider } = UserContext;

function reducer(state: User, action: any) {
  switch (action.type) {
    case "add":
      const userData = {
        ...state,
        id: action.id,
        userName: action.userName,
        firstName: action.firstName,
        lastName: action.lastName,
        isAuthenticated: action.isAuthenticated,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    // case "remove":
    //   return state.filter((_: any, index: any) => {
    //     return index !== action.index;
    //   });

    case "timeOut":
      return {
        ...state,
        userName: "",
        firstName: "",
        lastName: "",
        isAuthenticated: "false",
      };

    default:
      return state;
  }
}
// const user = JSON.parse(localStorage.getItem("user"))
//   ? JSON.parse(localStorage.getItem("user"))
//   : [];
const user: any = [];

function UserProvider({ value = {}, ...props }) {
  const [state, dispatch] = useReducer(reducer, user);

  //   return <Provider value={{ state, dispatch }} {...props} />;
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
