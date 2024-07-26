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
            // const newQuiz: any = {
            //     _id: quiz._id,
            //     course: quiz.course,
            //     name: quiz.name,
            //     due: quiz.due,
            //     availableFrom: quiz.availableFrom,
            //     availableUntil: quiz.availableUntil,
            // };
            state.quizzes = [...state.quizzes, quiz] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            // state.assignments = state.assignments.filter(
            //     (m: any) => m._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            // state.assignments= state.assignments.map((m: any) =>
            //     m._id === assignment._id ? assignment : m
            // ) as any;
        },
        editAssignment: (state, { payload: assignment }) => {
            // state.assignments = state.assignments.map((m: any) =>
            //     m._id === assignment ? { ...m, editing: true } : m
            // ) as any;
        },
    },
});
export const { addQuiz, deleteAssignment, updateAssignment, editAssignment,setQuizzes } =
    quizSlice.actions;
export default quizSlice.reducer;