
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
      fetch("http://localhost:3000/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          response.json();
          if (response.ok) {
            setUsernameError("");
            setPasswordError("");
            setSucessFlag(true);
            setSucessMessage("User Registered Sucessfully.");
          }
          else {
            setUsernameError("UserName already Exists");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (action === "login") {
        fetch("http://localhost:3000/login", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
              console.log(response);
            response.json();
            if (response.ok) {
                setSucessFlag(true);
                console.log('login good')
              setUsernameError("");
              setPasswordError("");
              setSucessMessage("User details verified.");
            }
            else {
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
