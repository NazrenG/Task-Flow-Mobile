import { getToken, saveToken } from "../secureStore";

const URL = "https://e33ce7167fc7.ngrok-free.app/api";
// const URL = "https://taskflowwebapi20250802142810.azurewebsites.net/api";

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
      console.log("token: " + data.token);
      saveToken("authToken", data.token);
      return true;
    }
  } catch (error) {
    console.error("Signin error:", error);
  }
};

export const fetchEmailConfirmation = async (nameOrEmail) => {
  console.log("in fetch confirmation: " + nameOrEmail);
  try {
    const response = await fetch(URL + "/Profile/ForgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameOrEmail }),
    });

    if (!response.ok) {
      response.text().then((text) => {
        console.log("error in confirmation: " + text);
      });
      return false;
    } else {
      response.text().then((text) => {
        console.log(" in confirmation: " + text);
      });
      return true;
    }
  } catch (error) {
    console.error("Confirmation error:", error);
  }
};

export const fetchVerifyCode = async (code, email) => {
  try {
    console.log("verify code email: " + email);
    console.log("code:" + code);
    const numericCode = Number(code.join(""));
    console.log(numericCode);
    const model = { code: numericCode, email };
    const response = await fetch(URL + "/Profile/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });

    if (!response.ok) {
      response.text().then((text) => {
        console.log("error in verify code: " + text);
      });
      return false;
    } else {
      console.log("response: " + response.text);
      return true;
    }
  } catch (error) {
    console.error("verify code error:", error);
  }
};
export const fetchChangePassword = async (email, newPassword) => {
  try {
    console.log("verify code email: " + email);

    const response = await fetch(URL + "/Profile/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (!response.ok) {
      response.text().then((text) => {
        console.log("error in change password: " + text);
      });
      return false;
    } else {
      console.log("response change password: " + response.text);
      return true;
    }
  } catch (error) {
    console.error("change password error:", error);
  }
};

export const fetchLogout = async () => {
  try {
    const token = await getToken("authToken");
    console.log("logout token: " + token);
    const response = await fetch(URL + "/Profile/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("error in logout: " + data.message);
    // if (response.ok) {
    //   console.log("logout successfull");
    //   await deleteToken("authToken");
    //   return true;
    // } else return false;
  } catch (error) {
    console.log("error in logout: " + error);
  }
};

//////////////////////////////////////////////////////////////////////
