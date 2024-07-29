import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: [],
};

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            // state.quizzes = [...state.quizzes, quiz] as any;
        },
        deleteQuestion: (state, { payload: questionNumber }) => {
            state.questions = state.questions.map((question: any) => {
                if (question.number == questionNumber) {
                    return {
                        ...question,
                        deleted: true,
                    };
                }
                return question;
            }) as any;
        },
        updateQuiz: (state, { payload: newQuiz }) => {
            // state.quizzes= state.quizzes.map((quiz:any) =>
            //     quiz._id === newQuiz._id ? newQuiz : quiz
            // ) as any;
        },
        editAssignment: (state, { payload: assignment }) => {
            // state.assignments = state.assignments.map((m: any) =>
            //     m._id === assignment ? { ...m, editing: true } : m
            // ) as any;
        },
    },
});
export const { addQuiz,
    deleteQuestion,
    updateQuiz,
    editAssignment,
    setQuestions } = questionSlice.actions;
export default questionSlice.reducer;