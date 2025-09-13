import { getToken } from "../secureStore";

const URL = "https://85d4e2d27067.ngrok-free.app/api";

export const fetchUpdateProfessionQuizzes = async (quizId, profession) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(`${URL}/Quiz/Profession`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ QuizId: quizId, Profession: profession }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Quiz updated successfully:", data);
      return data;
    } else {
      console.error("Failed to update quiz:", response.status);
    }
  } catch (error) {
    console.error("Error updating quiz:", error);
  }
}
export const fetchUpdateOccupationQuiz = async (quizId, profession) => {
  try {
    const token = await getToken("authToken");
    const response = await fetch(`${URL}/Quiz/Occupation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ QuizId: quizId, Profession: profession }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Quiz updated successfully:", data);
      return data;
    } else {
      console.error("Failed to update quiz:", response.status);
    }
  } catch (error) {
    console.error("Error updating quiz:", error);
  }
}
