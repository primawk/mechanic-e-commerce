import Axios from "axios";
import { API_URL } from "../../constants/API";

export const register = ({ fullName, username, email, password }) => {
  // register button
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
      },
    }).then((result) => {
      if (result.data.length) {
        dispatch({
          type: "USER_PROTECT",
          payload: "Username is already exists.",
        });
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        dispatch({
          type: "USER_PROTECT",
          payload: "Please in input a valid email.",
        });
      } else {
        Axios.get(`${API_URL}/users`, {
          params: {
            email,
          },
        }).then((result) => {
          if (result.data.length) {
            dispatch({
              type: "USER_ERROR",
              payload: "Email is already exists.",
            });
          } else {
            Axios.post(`${API_URL}/users/regis`, {
              fullName,
              username,
              email,
              password,
              role: "user",
            })
              .then((result) => {
                delete result.data.password;
                dispatch({
                  type: "USER_LOGIN",
                  payload: result.data,
                });
              })
              .catch(() => {
                alert("Gagal mendaftarkan user!");
              });
          }
        });
      }
    });
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username, // looking for the same username
      },
    })
      .then((result) => {
        if (result.data.length) {
          // looking for the same username
          if (password === result.data[0].password) {
            // looking for the same password
            delete result.data[0].password;
            window.location.reload(false); // Auto refresh

            localStorage.setItem(
              // // set user data in local storage (temporary storage in the browser) result data has to be a string so use stringify()
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
  localStorage.removeItem("userDataEmmerce"); // remove user data
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  // keep users logged in when the page is refreshed
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        delete result.data[0].password; // user's privacy

        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0])); // set user data in local storage (temporary storage in the browser) result data has to be a string so use stringify()

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
