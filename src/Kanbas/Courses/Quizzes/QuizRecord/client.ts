import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_RECORDS_API = `${REMOTE_SERVER}/api/quizRecords`;

export const createQuizRecord = async (quizRecord: any, questions:any) => {
    const requestBody = {
        quizRecord: quizRecord,
        questions: questions
    };
    const response = await axios.post( `${QUIZ_RECORDS_API}`, requestBody);
    return response.data;
};

export const findAttemptsForOneQuiz = async (userId:string,quizId: string) => {
    const response = await axios
        .get(`${QUIZ_RECORDS_API}/${userId}/${quizId}`);
    return response.data;
};

export const findOneQuizRecordById = async (quizRecordId:string) => {
    const response = await axios.get(`${QUIZ_RECORDS_API}/${quizRecordId}`);
    return response.data;
}