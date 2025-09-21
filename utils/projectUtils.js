import { getToken, URL } from "../secureStore";

export const fetchComplatedProjectCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/CompletedTaskCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("CompletedTaskCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("complated projects count error: " + error);
  }
};

export const fetchOnGoingProjectCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/OnGoingProjectCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("OnGoingProjectCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("OnGoingProjectCount projects count error: " + error);
  }
};
export const fetchPendingProjectCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/PendingProjectCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("PendingProjectCount projects count" + data);
      return data;
    }
  } catch (error) {
    console.log("pendingg projects count error: " + error);
  }
};

export const fetchTotalProjectsCount = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/UserProjectCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // response.text().then((text) => {
    //   console.log("error in total list: " + text);
    // });
    if (response.ok) {
      const data = await response.json();
      console.log("Total projects: " + JSON.stringify(data));
      console.log("Total projects: " + response);
      return data;
    }
  } catch (error) {
    console.log("Total projects error: " + JSON.stringify(error));
  }
};

export const fetchOnGoingProjectsList = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/OnGoingProject", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // response.text().then((text) => {
    //   console.log("in on going projects list: " + text);
    // });
    if (response.ok) {
      const data = await response.json();
      console.log("OnGoingProject: " + data);
      console.log("OnGoingProject: " + response);
      return data;
    }
  } catch (error) {
    console.log("OnGoingProject error: " + error);
  }
};

export const fetchRecentActivitiesList = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      URL + "/ProjectActivity/TeamMemberActivities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // response.text().then((text) => {
    //   console.log("error in RecentActivities list: " + text);
    // });
    if (response.ok) {
      const data = await response.json();
      console.log("RecentActivities: " + data);

      return data;
    }
  } catch (error) {
    console.log("RecentActivities error: " + error);
  }
};

export const fetchCreateProject = async (project) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("create project: " + JSON.stringify(data));
      return true;
    } else {
      response.text().then((text) => {
        console.log("error in create project: " + text);
      });
    }
  } catch (error) {
    console.log("Create project error: " + error);
  }
};

export const fetchUsersProjects = async () => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + "/Project/AllProjectsUserOwn", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("usersprojects count" + data);
      return data;
    }
  } catch (error) {
    console.log("usersprojects count error: " + error);
  }
};

export const fetchProjectDetail = async (projectId) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/Project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("fetch project detail: " + data);
      return data;
    }
  } catch (error) {
    console.log("fetch project detail error: " + error);
  }
};

export const fetchDeleteProject = async (projectId) => {
  try {
    const token = await getToken("authToken");
    const response = await await fetch(URL + `/Project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) return true;
  } catch (error) {
    console.log("error in delete project: " + error);
  }
};

export const fetchEditProject = async (project, projectId) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/Project/Put/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectId, project),
    });
    console.log(
      "in fetch edit project: " + projectId + " " + JSON.stringify(response)
    );
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log("error in edit project: " + error);
  }
};

export const fetchFilteredProjects = async (filterKey) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(URL + `/Project/${filterKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("project filter data: " + JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.log("error in project filter: " + error);
  }
};

/////////////////////////////////////
///TEAMMEMBERS fetches

export const fetchAllUsersAndMembers = async (projectId) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      URL + `/TeamMember/GetUsersByProject/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("fetching users and members: " + JSON.stringify(data));
      return data;
    } else
      console.log(
        "fetching users and members response false: " + JSON.stringify(response)
      );
  } catch (error) {
    console.log("Error in fetching users and members: " + error);
  }
};

export const fetchUpdateTeammemberList = async (projectId, members) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(
      URL + `/TeamMember/UpdateTeamMemberCollections`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId, members }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(
        "fetching UpdateTeamMemberCollections: " + JSON.stringify(data)
      );
      return data;
    } else
      console.log(
        "fetching UpdateTeamMemberCollections response false: " +
          JSON.stringify(response)
      );
  } catch (error) {
    console.log("error in fetchUpdateTeammemberList: " + error);
  }
};
