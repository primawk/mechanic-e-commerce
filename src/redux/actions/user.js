import Axios from "axios";
import { API_URL } from "../../constants/API";
import { userConstants } from "../../_constants/user.constants";
import { userService } from "../../_services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "./history";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

// export const register = ({ user }) => {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.register(user).then(
//       (user) => {
//         dispatch(success());
//         history.push("/login");
//         dispatch(alertActions.success("Registration successful"));
//       },
//       (error) => {
//         dispatch(failure(error));
//         dispatch(alertActions.error(error));
//       }
//     );
//   };
//   function request(user) {
//     return { type: userConstants.REGISTER_REQUEST, user };
//   }
//   function success(user) {
//     return { type: userConstants.REGISTER_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: userConstants.REGISTER_FAILURE, error };
//   }
// };

export const registerUser = ({ fullName, username, email, password }) => {
  // return (dispatch) => {
  //   Axios.get(`${API_URL}/users`, {
  //     params: {
  //       username,
  //     },
  //   })
  //   .then((result) => {
  //     if (username == result.data.username) {
  //       alert("username is already taken")
  //     }
  //   })

  //   dispatch({
  //     type: "USER_ERROR",
  //     payload:
  //       "It looks like you entered an incorrect password or username.",
  //   });
  // }

  // }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    alert("input a valid email");
  } else {
    return (dispatch) => {
      Axios.post(`${API_URL}/users`, {
        fullName,
        username,
        email,
        password,
        role: "user",
      })

        .then((result) => {
          dispatch({
            type: "USER_LOGIN",
            payload: result.data,
          });
          alert("Sucessfully signed up!");
        })

        .catch(() => {
          alert("Failed to sign up");
        });
    };
  }
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
      },
    })
      .then((result) => {
        if (result.data.length) {
          if (password === result.data[0].password) {
            delete result.data[0].password;

            localStorage.setItem(
              "userDataEmmerce",
              JSON.stringify(result.data[0])
            );

            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            dispatch({
              type: "USER_ERROR",
              payload:
                "It looks like you entered an incorrect password or username.",
            });
          }
        } else {
          // Handle error username not found
          dispatch({
            type: "USER_ERROR",
            payload:
              "It looks like you entered an incorrect password or username.",
          });
        }
      })
      .catch((err) => {
        alert("Error has occurred login");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        delete result.data[0].password;

        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));

        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch(() => {
        alert("Error has occurred keeplogin!");
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
