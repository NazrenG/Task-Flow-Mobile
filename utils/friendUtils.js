import { getToken } from "../secureStore";

//const URL = "https://taskflowwebapi20250802142810.azurewebsites.net/api";
const URL = "https://88111cea5413.ngrok-free.app/api";

export const fetchAllFriends = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Friend/AllFriends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched all friends:", data);
      return data;
    } else {
      console.error("Failed to fetch friends:", response.status);
    }
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Friend/AllUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched friend requests:", data);
      return data;
    } else {
      console.error("Failed to fetch friend requests:", response.status);
    }
  } catch (error) {
    console.error("Error fetching friend requests:", error);
  }
};

export const fetchSendFollowRequest = async (datas) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Friend/NewFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datas),
    });

    console.log("Auth token: ", token);
    console.log("follow data: ", datas);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Failed to create follow data:",
        response.status,
        errorText
      );
      return null;
    }

    const text = await response.text();
    if (!text) {
      console.log("No content returned from follow request");
      return { success: true };
    }

    const data = JSON.parse(text);
    console.log("follow response: ", data);
    return data;
  } catch (error) {
    console.error("Error creating follow:", error);
    return null;
  }
};

export const fetchUnfollowRequest = async (email) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/Friend/UnFollow/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log(" Unfollow request deleted successfully");
      return true;
    } else {
      console.error("Failed to delete unfollow request", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchFriendRequests = async (friendData) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Notification/NewRequestNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(friendData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Friend request sent successfully:", data);
      return data;
    } else {
      console.error("Failed to send friend request:", response.status);
    }
  } catch (error) {
    console.error("Error sending friend request:", error);
  }
};

export const fetchDeleteFriendRequest = async (userId) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/Friend/DeleteRequest/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Friend request sent successfully:", data);
      return data;
    } else {
      console.error(
        "fetchDeleteFriendRequestrequest:",
        JSON.stringify(response)
      );
    }
  } catch (error) {
    console.error("Error fetchDeleteFriendRequest:", error);
  }
};
