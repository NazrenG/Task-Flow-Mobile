import { deleteToken, getToken, saveToken } from "../secureStore";

const URL = "https://85d4e2d27067.ngrok-free.app/api";

export const fetchTotalUserCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Auth/UsersCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
        if (response.ok) {
            const data = response.json();
            console.log("TotalUserCount users count" + data);
            return data;
        }
    } catch (error) {
        console.log("total users count error: " + error);
    }
}

export const fetchUserProjectCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/UserProjectCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
        if (response.ok) {
            const data = response.json();
            console.log("UserProjectCount projects count" + data);
            return data;
        }
    } catch (error) {
        console.log("user projects count error: " + error);
    }
}

export const fetchProjectInvolvedCount=async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/ProjectInvolvedCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
            
            Authorization: `Bearer ${token}`,
        },
      });
        if (response.ok) {
            const data = response.json();
            console.log("ProjectInvolved projects count" + data);
            return data;
        }
    } catch (error) {
        console.log("projects involved count error: " + error);
    }
}