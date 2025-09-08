// signalRService.js
import * as signalR from "@microsoft/signalr";

let connection = null;

export async function startSignalRConnection({ hubUrl, accessToken }) {
  if (connection && connection.state === "Connected") return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => accessToken,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Warning)
    .build();

  // lifecycle logging
  connection.onreconnecting((error) => {
    console.warn("SignalR reconnecting: ", error?.message);
  });
  connection.onreconnected((connectionId) => {
    console.log("SignalR reconnected. ConnectionId:", connectionId);
  });
  connection.onclose((error) => {
    console.warn("SignalR closed: ", error?.message);
  });

  // // register server-to-client handlers used by your hub
  // connection.on("ReceiveOnlineStatus", (userId, isOnline) => {
  //   console.log("ReceiveOnlineStatus", userId, isOnline);
  //   // update app state / redux / context here
  // });

  // connection.on("UpdateUserActivity", () => {
  //   console.log("UpdateUserActivity");
  //   // refresh user lists, etc
  // });

  //   connection.on("ReceiveMessages2", (email) => {
  //     console.log("ReceiveMessages2", email);
  //   });

  //   connection.on("UpdateProjectList", () => {
  //     console.log("UpdateProjectList");
  //   });

  //   connection.on("UpdateProfileRequestList", () => {
  //     console.log("UpdateProfileRequestList");
  //   });

  // start (with retry)
  try {
    await connection.start();
    console.log("SignalR connected, id:", connection.connectionId);
  } catch (err) {
    console.error("SignalR connection error:", err);
    // let automatic reconnect attempt work, or retry manually
    throw err;
  }

  return connection;
}

export async function stopSignalRConnection() {
  if (!connection) return;
  try {
    await connection.stop();
  } catch (err) {
    console.warn("Error stopping SignalR:", err);
  } finally {
    connection = null;
  }
}

// Exposed server-invokes
export function sendOnlineStatus(userId, isOnline) {
  return connection?.invoke("SendOnlineStatus", userId, isOnline);
}

// export function notifyProjectUpdate(projectId) {
//   return connection?.invoke("NotifyProjectUpdate", projectId);
// }

// export function requestMessages(receiverId, senderId) {
//   return connection?.invoke("GetMessages", receiverId, senderId);
// }

// export function updateOwnProjectList() {
//   return connection?.invoke("UpdateOwnProjectList");
// }

// export function sendFollow(id) {
//   return connection?.invoke("SendFollow", id);
// }
