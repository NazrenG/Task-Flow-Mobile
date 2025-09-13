import { getToken } from "../secureStore";

const URL = "https://85d4e2d27067.ngrok-free.app/api";
//const URL = "https://taskflowwebapi20250802142810.azurewebsites.net/api";

export const fetchRequestNotifications = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(`${URL}/Notification/RequestNotification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(` notifications fetched successfully`, data);
      return data;
    } else {
      console.error(`Failed to fetch  notifications`, response.status);
    }
  } catch (error) {
    console.error(`Error fetching   notifications`, error);
  }
};

export const fetchProjectRequestNotifications = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(`${URL}/Notification/ProjectRequestNotification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(` project requests fetched successfully`, data);
      return data;
    } else {
      console.error(`Failed to fetch project requests`, response.status);
    }
  } catch (error) {
    console.error(`Error fetching project requests`, error);
  }
};



export const fetchReminderNotifications = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(`${URL}/Notification/CalendarNotifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(` reminders fetched successfully`, data);
      return data;
    } else {
      console.error(`Failed to fetch reminders`, response.status);
    }
  } catch (error) {
    console.error(`Error fetching reminders`, error);
  }
};

export const fetchDeleteReminterNotification = async (id) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      `${URL}/Notification/DeletedCalendarMessage/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      console.log(`Reminder notification with id ${id} deleted successfully`);
      return true;
    } else {
      console.error(`Failed to delete reminder notification`, response.status);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting reminder notification`, error);
    return false;
  }
};

export const fetchAcceptRequestNotification = async (id) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      `${URL}/Notification/AcceptRequestNotification/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      console.log(`Request notification with id ${id} accepted successfully`);
      return true;
    } else {
      console.error(`Failed to accept request notification`, response.status);
      return false;
    }
  } catch (error) {
    console.error(`Error accepting request notification`, error);
    return false;
  }
};

export const fetchRejectRequestNotification = async (id) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      `${URL}/Notification/DeleteRequestNotification/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      console.log(`Request notification with id ${id} rejected successfully`);
      return true;
    } else {
      console.error(`Failed to reject request notification`, response.status);
      return false;
    }
  } catch (error) {
    console.error(`Error rejecting request notification`, error);
    return false;
  }
};
