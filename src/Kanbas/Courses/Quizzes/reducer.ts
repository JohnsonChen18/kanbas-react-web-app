import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            state.quizzes = [...state.quizzes, quiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (m: any) => m._id !== quizId);
        },
        updateQuiz: (state, { payload: newQuiz }) => {
            state.quizzes= state.quizzes.map((quiz:any) =>
                quiz._id === newQuiz._id ? newQuiz : quiz
            ) as any;
        },
        editAssignment: (state, { payload: assignment }) => {
            // state.assignments = state.assignments.map((m: any) =>
            //     m._id === assignment ? { ...m, editing: true } : m
            // ) as any;
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, editAssignment,setQuizzes } =
    quizSlice.actions;
export default quizSlice.reducer;