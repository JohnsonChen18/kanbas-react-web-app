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
        addQuestion: (state, { payload: question}) => {
            state.questions = [...state.questions, question] as any;
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
        updateQuestion: (state, { payload: newQuestion }) => {
            state.questions= state.questions.map((q:any) =>
                q.number === newQuestion.number ? newQuestion : q
            ) as any;
        },
        editAssignment: (state, { payload: assignment }) => {
            // state.assignments = state.assignments.map((m: any) =>
            //     m._id === assignment ? { ...m, editing: true } : m
            // ) as any;
        },
    },
});
export const { addQuestion,
    deleteQuestion,
    updateQuestion,
    editAssignment,
    setQuestions } = questionSlice.actions;
export default questionSlice.reducer;