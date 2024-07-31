import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
export const createQuestion = async (question: any) => {
    const response = await axios.post( `${QUESTIONS_API}`, question);
    return response.data;
};
export const findQuestionsByQuiz = async (quizId: string) => {
    const response = await axios
        .get(`${QUESTIONS_API}/quiz/${quizId}`);
    return response.data;
};
export const updateQuestions = async (questions: any) => {
    const response = await axios.put(`${QUESTIONS_API}`,  questions);
    return response.data;
}
// export const deleteQuiz = async (quizId: string) => {
//     const response = await axios
//         .delete(`${QUIZZES_API}/${quizId}`);
//     return response.data;
// };