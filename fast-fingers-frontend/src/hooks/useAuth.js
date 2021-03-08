import { signIn, signUp } from "../services/authService";

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
      setUsernameError("Please Enter a UserName");
    }
    if (password === "") {
      setPasswordError("Please Enter a Password");
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
            setSucessMessage("User Registered Sucessfully.");
          } else {
            setUsernameError("UserName already Exists");
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
            setSucessMessage("User details verified.");
          } else {
            setUsernameError("Incorrect Login Details");
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
