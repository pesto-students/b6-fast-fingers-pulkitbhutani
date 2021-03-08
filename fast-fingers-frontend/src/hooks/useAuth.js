import { signIn, signUp } from "../services/authService";
import {PLAYER_NAME_ERROR, PASSWORD_ERROR, USER_EXISTS_ERROR, INCORRECT_LOGIN_DETAILS_ERROR, USER_REGISTERED_SUCESS} from "../utility/Constants";

function useAuth(
  username,
  password,
  setUsernameError,
  setPasswordError,
  setSucessFlag,
  setSucessMessage,
  action
) {
  const onSubmit = () => {
    if (username === "") {
      setUsernameError(PLAYER_NAME_ERROR);
    }
    if (password === "") {
      setPasswordError(PASSWORD_ERROR);
    } else {
      performAuthAction();
    }
  };

  const performAuthAction = () => {
    let data = { username: username, password: password };
    console.log(data);
    if (action === "register") {
      signUp(data)
        .then((response) => {
          response.json();
          if (response.ok) {
            setUsernameError("");
            setPasswordError("");
            setSucessFlag(true);
            setSucessMessage(USER_REGISTERED_SUCESS);
          } else {
            setUsernameError(USER_EXISTS_ERROR);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (action === "login") {
      signIn(data)
        .then((response) => {
          console.log(response);
          response.json();
          if (response.ok) {
            setSucessFlag(true);
            localStorage.setItem("username", data.username);
            console.log("login good");
            setUsernameError("");
            setPasswordError("");
          } else {
            setUsernameError(INCORRECT_LOGIN_DETAILS_ERROR);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return {
    onSubmit,
  };
}

export default useAuth;
