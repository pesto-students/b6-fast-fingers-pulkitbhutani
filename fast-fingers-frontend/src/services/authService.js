export const signUp = (body) => {
    return fetch("http://localhost:3000/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  };
  
  export const signIn = (body) => {
    return fetch("http://localhost:3000/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
  };

  export const signOut = () => {
      localStorage.setItem('username', '');
  }