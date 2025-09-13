import { getToken } from "../secureStore";

const URL = "https://5e5aecc22b19.ngrok-free.app/api";

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
};

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
};

export const fetchProjectInvolvedCount = async () => {
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
}; 


export const fetchWorkDailyTask=async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Work/DailyTask", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Daily Task fetched successfully:", data);
      return data;
    } else {
      console.error("Failed to fetch Daily Task:", response.status);
    }
    } catch (error) {
    console.error("Error fetching Daily Task:", error);
  }
};


export const fetchUserDailyTask=async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/DailyTask", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        });
    if (response.ok) {
      const data = await response.json();
      console.log("Daily User Task fetched successfully:", data);
      return data;
    } else {
        console.error("Failed to fetch Daily User Task:", response.status);
        }
    } catch (error) {
    console.error("Error fetching Daily User Task:", error);
    }
};

 

export const fetchProjectInvolved = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/ProjectInvolved", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Project Involved fetched successfully:", data);
      return data;
    }
    else {
        console.error("Failed to fetch Project Involved:", response.status);
    }
    } catch (error) {
    console.error("Error fetching Project Involved:", error);
  }
};
