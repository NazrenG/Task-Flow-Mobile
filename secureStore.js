import * as SecureStore from "expo-secure-store";

export const URL = "https://ce087ab095c2.ngrok-free.app/api";

export async function saveToken(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("Token saved securely!");
  } catch (error) {
    console.error("Error saving token", error);
  }
}

export async function getToken(key) {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      // console.log("Token retrieved:", result);
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
}

export async function deleteToken(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("Token deleted!");
  } catch (error) {
    console.error("Error deleting token", error);
  }
}
