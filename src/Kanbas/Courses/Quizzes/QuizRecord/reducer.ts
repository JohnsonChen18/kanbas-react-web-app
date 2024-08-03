import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizRecord: {
        quizId: "Default_quizId",
        userId: "Default_userId",
        grade: 0,
        startTime: new Date(),
        questionRecords:[{}],
    },
};

const quizRecordSlice = createSlice({
    name: "quizRecord",
    initialState,
    reducers: {
        setQuizRecord: (state, action) => {
            state.quizRecord = action.payload;
        },
        createQuizRecord: (state, { payload}) => {
            const { questions, quizId, userId } = payload;
            const questionRecords = questions.map((question: any) => ({
                questionId: question._id,
                // selectedTrueFalse: true,
                // selectedOptionNumber: 0,
                fillInBlankAnswers: question.questionType == "FILL_IN_BLANK"? question.correct_answers.map((answer:any)=>""):[],
            }));
            const newQuizRecord = {
                quizId: quizId,
                userId: userId,
                grade: 0,
                startTime: new Date(),
                questionRecords: questionRecords
            };
            state.quizRecord = newQuizRecord;
        },
        updateOneQuestionRecord: (state, { payload:newQuestionRecord}) => {
            console.log(newQuestionRecord);
            state.quizRecord.questionRecords = state.quizRecord.questionRecords.map((record:any)=>(
                record.questionId == newQuestionRecord.questionId? newQuestionRecord: record
            )) as any;
        },
    },
});
export const { setQuizRecord, createQuizRecord, updateOneQuestionRecord } = quizRecordSlice.actions;
export default quizRecordSlice.reducer;