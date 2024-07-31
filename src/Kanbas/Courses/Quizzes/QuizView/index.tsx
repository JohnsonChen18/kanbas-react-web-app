import * as questionClient from "../../Questions/client";
import {setQuestions} from "../../Questions/reducer";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useParams} from "react-router";
import {Link} from "react-router-dom";

interface Question {
    title: string;
    text: string;
    questionType: string;
    is_correct: boolean;
}

export default function QuizView() {
    const {cid, quizId, questionIndex} = useParams();
    const dispatch = useDispatch();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {questions} = useSelector((state: any) => state.questionReducer);
    const [currQuiz, setCurrQuiz] = useState(quizzes.find((quiz: any) => quiz._id === quizId));
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
    const fetchQuestions = async () => {
        const questions = await questionClient.findQuestionsByQuiz(quizId as string);
        dispatch(setQuestions([...questions].filter((question: any) => question.deleted == false).sort((a, b) => a.number - b.number)));
    }
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="wd-quiz-view-screen">
            <div className="wd-quiz-view-quiz-name">
                <h2>{currQuiz.name}</h2>
            </div>
            <div id="wd-quiz-view-prompt"
                 className="alert alert-danger mb-4 me-2 fs-4 text-center fs-2">
                You are currently in preview mode as a faculty
            </div>
            <QuestionContainer question={questions[currQuestionIndex]}/>
            <hr/>
            <div className="wd-quiz-view-buttons-row row mb-4">
                <div className="col-4">
                    {currQuestionIndex > 0 &&
                        <button id="wd-quiz-pre-btn" className="btn btn-lg btn-secondary mb-2 ms-4 mb-md-0 float-start"
                                onClick={() => setCurrQuestionIndex(currQuestionIndex - 1)}>
                            Pre
                        </button>}
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <button id="wd-quiz-pre-btn" className="btn btn-lg btn-danger mb-2 mb-md-0">
                        SUBMIT QUIZ
                    </button>
                </div>
                <div className="col-4">
                    {currQuestionIndex < questions.length - 1 &&
                        <button id="wd-quiz-next-btn" className="btn btn-lg btn-secondary me-4 mb-2 mb-md-0 float-end"
                                onClick={() => setCurrQuestionIndex(currQuestionIndex + 1)}>
                            Next
                        </button>}
                </div>
            </div>
            <div className="wd-quiz-view-jump-buttons d-grid">
                <div className="wd-quiz-view-jump-row text-start text-danger"><h3>Jump To:</h3></div>
                {questions.map((question: any, index: number) => (
                    <div className="wd-quiz-view-jump-buttons-row text-start">
                        <span onClick={()=>setCurrQuestionIndex(index)} style={{color: 'red', cursor: 'pointer', textDecoration: 'underline'}}>
                            Question {index+1}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function QuestionContainer({question}: { question: any }) {
    if(question == undefined) return <div>undefined question</div>;
    return (
        <div className="wd-quiz-view-content-container container">
            <div className="card">
                <div className="card-header bg-light fw-bolder">
                    <h3>{question.title && question.title}</h3>
                </div>
                <div className="card-body">
                    <p className="mb-5">{question.text && question.text}</p>
                    {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                        <label className="fw-bold ms-2">
                            <input
                                type="radio"
                                checked={question.is_correct}
                            />
                            &nbsp;True&nbsp;
                        </label></div>}
                    {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                        <label className="fw-bold ms-2">
                            <input
                                type="radio"
                                checked={!question.is_correct}
                            />
                            &nbsp;False&nbsp;
                        </label></div>}
                    {question.questionType == "MULTIPLE_CHOICE" && question.options.filter((option:any)=>(option.deleted == false)).map((option:any)=> (
                        <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                            <label className="col-6 d-flex align-items-center justify-content-start fw-bold"
                                   htmlFor="wd-quiz-possible-answer">
                                <input
                                    type="radio"
                                    checked={option}
                                />&nbsp;
                                <div className={`col-6 d-flex align-items-center justify-content-start`}>
                                    {question.options.find((o: any) => o.number == option.number).text || ""}
                                </div>
                            </label>
                        </div>
                    ))}
                    {question.questionType == "FILL_IN_BLANK" && question.correct_answers.map((answer: any, index:any) => (
                        <div>
                            <div className={`wd-question-answer-${index}-row row mb-4`}>
                                <div className="col-1">
                                    <label className="d-flex align-items-center justify-content-end fw-bold mt-2"
                                           htmlFor="wd-quiz-possible-answer">
                                        {`Answer ${index + 1}: `}
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input id="wd-question-answer"
                                           className="form-control customized-boarder w-50 d-flex align-items-center justify-content-start"
                                           value={""}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}