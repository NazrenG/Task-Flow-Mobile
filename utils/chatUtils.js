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
