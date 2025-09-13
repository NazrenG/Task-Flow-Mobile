import { getToken } from "../secureStore";

const URL = "https://5e5aecc22b19.ngrok-free.app/api";

//Work/UserTasks
export const fetchWorkUserTasks = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Work/UserTasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log("Fetched work tasks:", data);
        return data;
    }
    else {
        console.error("Failed to fetch work tasks:", response.status);
    }
 } catch (error) {
    console.error("Error fetching work tasks:", error);
    }
};

//UserTask/UserTasks
export const fetchUserTasks = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/UserTasks", {

        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log("Fetched user tasks:", data);
        return data;
    }
    else {
        console.error("Failed to fetch user tasks:", response.status);
    }
    } catch (error) {
    console.error("Error fetching user tasks:", error);
    }
}