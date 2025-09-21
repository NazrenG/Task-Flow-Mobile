import { deleteToken, getToken, saveToken, URL } from "../secureStore";
import { startSignalRConnection } from "../SignalR";

///// AUTH FETCHES
export const fetchSignUp = async (email, name, surname, username, password) => {
  try {
    console.log("in fetch");
    const user = {
      password: password,
      username: username,
      firstname: name,
      lastname: surname,
      email: email,
    };

    const response = await fetch(URL + "/Auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      return response.text().then((text) => {
        console.log("error in sign up: " + text);
      });
    }
    response.text().then((text) => {
      console.log("error in sign up: " + text);
    });
    return true;
  } catch (error) {
    console.error("Signup error:", error);
  }
};
export const fetchSignIn = async (username, password) => {
  try {
    console.log(password + username);
    const response = await fetch(URL + "/Auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      response.text().then((text) => {
        console.log("error in sign inn: " + text);
      });
      console.log(response.status);
      // const data=response.json()
      console.log(response);
      return false;
    } else {
      const data = await response.json();
      // console.log("token: " + data.token);
      saveToken("authToken", data.token);
      await startSignalRConnection({
        hubUrl: URL.replace(/\/api$/, "") + "/hubs/connection",
        accessToken: data.token,
      });
      return true;
    }
  } catch (error) {
    console.error("Signin error:", error);
  }
};
