import { getToken, URL } from "../secureStore";

export const fetchAllFriendsWithChats = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Chat/AllChatsWithFriends", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Request successful");
      const data = await response.json();
      if (data.list.length > 0) return data.list;
      console.log(data);
    } else {
      console.log("Request failed with status:", response.status);
      const errorData = await response.text();
      console.log("Error response:", errorData);
    }
  } catch (error) {
    console.log("error in fetchAllFriendsWithChats: " + error);
  }
};

export const fetchFriendContact = async (friendId) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/Chat/FriendsContactInfo/${friendId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // console.log("Request successful");
      const data = await response.json();
      return data;
    }
    //  else {
    //   console.log("Request failed with status:", response.status);
    //   const errorData = await response.text();
    //   console.log("Error response:", errorData);
    // }
  } catch (error) {
    console.log("error in fetchAllFriendContact: " + error);
  }
};

export const fetchAllMessages = async (friendMail) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      URL + `/ChatMessage/AllMessages/${friendMail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("all messages: " + JSON.stringify(data));
      return data;
    } else {
      console.log("response not ok: " + JSON.stringify(response));
    }
  } catch (error) {
    console.log("error in fetchAllMessages: " + error);
  }
};

export const fetchSendMessage = async (friendEmail, isImage, text) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/ChatMessage/NewMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendEmail, isImage, text }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("all messages: " + JSON.stringify(data));
      return data;
    } else {
      console.log("response not ok: " + JSON.stringify(response));
    }
  } catch (error) {
    console.log("error in fetchAllMessages: " + error);
  }
};
