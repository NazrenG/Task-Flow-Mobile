import { deleteToken, getToken, URL } from "../secureStore";

//////////////////////////////////////////////////////////////////////
//PROFILE FETCHES

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

export const fetchProfileData = async () => {
  try {
    const token = await getToken("authToken");
    console.log("logout token: " + token);
    const response = await fetch(URL + "/Auth/currentUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("profile data successfull");
      const data = await response.json();
      console.log("data in prof fetch: " + data);
      return data;
    } else return false;
  } catch (error) {
    console.log("error profile data: " + error);
  }
};

export const fetchUpdateProfileData = async (data) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Profile/EditedProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("profile data successfull");
      const data = await response.json();
      console.log("data in prof update fetch: " + data);
      return data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log("error update profile: " + error);
  }
};

export const fetchProfileImg = async (data) => {
  try {
    console.log("in img upload: " + JSON.stringify(data));
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Profile/EditedProfileImage", {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (response.ok) {
      console.log("profile img upload successfull");
      const data = await response.json();
      console.log("in profile img upload fetch: " + data);
      return data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log("error in profile img upload: " + error);
  }
};

export const fetchChangePassword = async (data) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Profile/ChangePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("profile change password successfull");
      const data = await response.json();
      console.log("in profile change password fetch: " + data);
      return data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log("error in profile change password: " + error);
  }
};

export const fetchResetPassword = async (email, newPassword) => {
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
    if (response.ok) {
      console.log("logout successfull");
      await deleteToken("authToken");
      return true;
    } else return false;
  } catch (error) {
    console.log("error in logout: " + error);
  }
};
