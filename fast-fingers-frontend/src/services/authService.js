import {FASTFINGERS_API_URL} from '../utility/Constants';
import {savePlayerName } from '../utility/UtilityFunctions';

export const signUp = (body) => {
    const res = fetch(FASTFINGERS_API_URL + "/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return res;
  };
  
  export const signIn = (body) => {
    const res = fetch(FASTFINGERS_API_URL + "/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      return res;
  };

  export const signOut = () => {
      savePlayerName('');
  }