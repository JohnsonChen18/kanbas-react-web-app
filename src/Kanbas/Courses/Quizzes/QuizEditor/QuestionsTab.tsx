import * as questionClient from "../../Questions/client";
import React, {useEffect, useState} from "react";
import {Route, Routes, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setQuestions, deleteQuestion, addQuestion} from "../../Questions/reducer";
import {Link, useNavigate} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import SingleQuestionEditor from "../../Questions/SingleQuestionEditor";

export default function QuestionsTab({quiz, setQuiz}: { quiz: any, setQuiz: any }) {
    const {cid, quizId} = useParams();
    const dispatch = useDispatch();
    const {questions} = useSelector((state: any) => state.questionReducer);

    return (
        <div className="wd-quiz-editor-questions-tab d-grid">
            <Routes>
                <Route path="" element={<QuestionsScreen/>}/>
                <Route path=":questionNumber" element={<SingleQuestionEditor/>}/>
            </Routes>
        </div>
    );
}

function QuestionsScreen() {
    const {questions} = useSelector((state: any) => state.questionReducer);
    const {cid, quizId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDeleteClick = (questionNumber: number) => {
        dispatch(deleteQuestion(questionNumber));
    }
    const handleAddQuestionClick = () => {
        console.log("called");
        const newNumber = questions.length > 0 ? questions[questions.length - 1].number+1:1;
        const newQuestion = {
            title: "DEFAULT_QUIZ_TITLE",
            quiz: quizId,
            points: 0,
            number: newNumber,
            questionType: "MULTIPLE_CHOICE",
            text: "DEFAULT_QUESTION_DESCRIPTION",
            options: [],
            is_correct: false,
            correct_answers: [],
            deleted: false,
            nextOptionNumber: 1,
            correctOptionNumber: 1,
        };
        dispatch(addQuestion(newQuestion));
        navigate(`${newNumber}`);
    };
    return (
        <div className="wd-quiz-editor-questions-screen d-grid">
            {questions.filter((question: any) => (question.deleted == false)).map((question: any, index: number) => (
                <div className="wd-quiz-editor-questions-row row mb-3">
                    <div className="col-3 d-flex align-items-center justify-content-end">
                        <button id="wd-save-quiz-btn" className="btn btn-sm btn-danger mb-2 me-2 mb-md-0 float-end col-3"
                                onClick={() => handleDeleteClick(question.number)}>
                            Delete
                        </button>
                    </div>
                    <div className="col-1 d-flex align-items-center justify-content-center">
                        <Link className="wd-quiz-editor-question-number fw-bolder text-danger"
                              to={`${question.number}`}>
                            {`Question ${index + 1}`}
                        </Link>
                    </div>
                    <div className="wd-quiz-editor-question-number col-4 fw-bold text-start d-flex align-items-center">
                        {question.title}
                    </div>
                </div>
            ))}
            <div className="wd-quiz-editor-question-add-button-row row">
                <div className="col-5">
                    <button id="wd-add-question-btn" className="float-end btn btn-lg btn-secondary mb-2 mb-md-0"
                            onClick={handleAddQuestionClick}>
                        <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                        New Question
                    </button>
                </div>
            </div>
        </div>
    );

}