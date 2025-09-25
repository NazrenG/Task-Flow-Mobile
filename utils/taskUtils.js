import { getToken } from "../secureStore";

//const URL = "https://taskflowwebapi20250802142810.azurewebsites.net/api";
const URL = "https://27dda00aed9c.ngrok-free.app/api";
 

export const fetchTotalTaskCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/UserTasksCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = response.json();
      console.log("TotalTaskCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("total projects count error: " + error);
  }
};
export const fetchRunningTaskCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/ToDoTaskCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = response.json();
      console.log("RunningTaskCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("running projects count error: " + error);
  }
};

export const fetchOnHoldTaskCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/InProgressTaskCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = response.json();
      console.log("OnHoldTaskCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("on hold projects count error: " + error);
  }
};

export const fetchCompletedTaskCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/DoneTaskCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = response.json();
      console.log("CompletedTaskCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("completed projects count error: " + error);
  }
};

export const fetchCreateTask = async (taskData) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/UserTask/NewTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    console.log("Auth token: ", token);
    console.log("Task data: ", taskData);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to create task:", response.status, errorText);
      return null;
    }
 
    const text = await response.text();
    if (!text) {
      console.log("CreateTask response: no content (task created).");
      return { success: true };
    }
 
    const data = JSON.parse(text);
    console.log("CreateTask response: ", data);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

export const fetchUpdateTask = async (taskId, taskData) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/UserTask/EditedTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("UpdateTask response: ", data);
      return data;
    } else {
      console.error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const fetchDeleteTask = async (taskId) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/UserTask/DeleteUserTask/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("Task deleted successfully");
      return true;
    } else {
      console.error("Failed to delete task");
      return false;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const fetchGetAllTasks = async () => {
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
      console.log("GetAllTasks response: ", data);
      return data;
    } else {
      console.error("Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
