import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import * as questionClient from "../../Questions/client";
import * as quizClient from "../client";
import * as recordClient from "./client"
import {setQuestions} from "../../Questions/reducer";
import {setQuizRecord} from "./reducer";
import {IoMdCheckmarkCircle} from "react-icons/io";


export default function QuizReview() {
    const dispatch = useDispatch();
    const {cid, quizId, quizRecordId} = useParams();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {questions} = useSelector((state: any) => state.questionReducer);
    const {quizRecord} = useSelector((state: any) => state.quizRecordReducer);
    const [currQuiz, setCurrQuiz] = useState({} as any);
    const fetchQuiz = async () => {
        const quiz = await quizClient.findOneQuiz(quizId as string);
        setCurrQuiz(quiz);
    }
    const fetchQuestions = async () => {
        const questions = await questionClient.findQuestionsByQuiz(quizId as string);
        await dispatch(setQuestions([...questions].filter((question: any) => question.deleted == false).sort((a, b) => a.number - b.number)));
    }
    const fetchQuizRecord = async () => {
        const record = await recordClient.findOneQuizRecordById(quizRecordId as string);
        await dispatch(setQuizRecord(record));
    }

    useEffect(() => {
        fetchQuestions();
        fetchQuiz();
        fetchQuizRecord();
    }, []);


    return (
        <div className="wd-quiz-review">
            <div className="btn" onClick={() => console.log(currQuiz)}> show curr quiz</div>
            <div className="btn" onClick={() => console.log(quizRecord)}> show quiz record</div>
            <div className="btn" onClick={() => console.log(questions)}> show questions</div>
            <div className="wd-quiz-review-quiz-name row">
                <h2 className="col-6 text-start">{currQuiz.name}</h2>
                <h2 className="col-6 text-end">{`Score: ${quizRecord.grade} of ${currQuiz.points} `}</h2>
            </div>
            <div id="wd-quiz-review-prompt"
                 className="alert alert-danger mb-4 me-2 text-center fs-5">
                You are currently reviewing your previous attempt
            </div>
            {questions.map((question:any)=>{
                const record = quizRecord.questionRecords.find((qRecord:any)=> qRecord.questionId == question._id);
                return(<QuestionContent question={question} questionRecord={record} currQuiz={currQuiz}/>);
            })}
        </div>
    );
};

function QuestionContent({question, questionRecord, currQuiz}: { question: any, questionRecord:any, currQuiz:any }) {
    const {quizRecord} = useSelector((state: any) => state.quizRecordReducer);
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [currQuestionRecord, setCurrQuestionRecord] = useState(questionRecord);
    function formatDate(isoString: string): string {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format hours to 12-hour format
        const hours12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'pm' : 'am';

        // Pad minutes with leading zero if needed
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${year} ${month} ${day} at ${hours12}:${paddedMinutes}${ampm}`;
    }
    useEffect(() => {
        setCurrQuestionRecord(questionRecord);
    }, [questionRecord]);

    if (currQuestionRecord == undefined) return <div> undefined</div>

    return (
        <div className="wd-quiz-view-content-container container">
            <a className="btn" onClick={() => console.log(currQuestionRecord)}>show curr question record</a>
            <div className="card">
                <div className={`card-header fw-bolder ${questionRecord.grade == question.points? "bg-success":"bg-danger"} bg-opacity-25`}>
                    <h3 className="float-start">
                        {question.title}
                    </h3>
                    <h6 className="float-end">{`Score: ${questionRecord.grade} of ${question.points}`}</h6>
                </div>
                <div className="card-body">
                    <p className="mb-5">
                        <div
                            dangerouslySetInnerHTML={{__html: question.text}}
                        />
                        {/*{question.text && question.text}*/}
                    </p>
                    <hr/>
                    <div className="mb-2 fw-bold">Your Answer:</div>
                    {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                        <label className="ms-2">
                            <input
                                type="radio"
                                checked={currQuestionRecord.selectedTrueFalse == undefined ? false : currQuestionRecord.selectedTrueFalse}
                            />
                            &nbsp;True&nbsp;
                        </label></div>}
                    {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                        <label className="ms-2">
                            <input
                                type="radio"
                                checked={currQuestionRecord.selectedTrueFalse == undefined ? false : !currQuestionRecord.selectedTrueFalse}
                            />
                            &nbsp;False&nbsp;
                        </label></div>}
                    {question.questionType == "MULTIPLE_CHOICE" && question.options.filter((option: any) => (option.deleted == false)).map((option: any) => (
                        <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                            <label className="col-6 d-flex align-items-center justify-content-start"
                                   htmlFor="wd-quiz-possible-answer">
                                <input
                                    type="radio"
                                    checked={currQuestionRecord.selectedOptionNumber ? currQuestionRecord.selectedOptionNumber == option.number : false}

                                />&nbsp;
                                <div className={`col-6 d-flex align-items-center justify-content-start`}>
                                    {question.options.find((o: any) => o.number == option.number).text || ""}
                                </div>
                            </label>
                        </div>
                    ))}
                    {question.questionType == "FILL_IN_BLANK" && question.correct_answers.map((answer: any, index: any) => (
                        <div>
                            <div className={`wd-question-answer-${index}-row row mb-4`}>
                                <div className="col-1">
                                    <label className="d-flex align-items-center justify-content-end"
                                           htmlFor="wd-quiz-possible-answer">
                                        {`Blank ${index + 1}: `}
                                    </label>
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                    {currQuestionRecord.fillInBlankAnswers[index] ? currQuestionRecord.fillInBlankAnswers[index] : ""}
                                    {/*<input id="wd-question-answer"*/}
                                    {/*       className="form-control customized-boarder w-50 d-flex align-items-center justify-content-start"*/}
                                    {/*       value={currQuestionRecord.fillInBlankAnswers[index] ? currQuestionRecord.fillInBlankAnswers[index] : ""}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr/>
                    {currentUser.role == "FACULTY" && <CorrectAnswersComponent question={question}/>}
                    {currentUser.role == "STUDENT" && currQuiz.showCorrectAnswers == "SET_TIME" && new Date() <= new Date(currQuiz.whenToShowAnswers) &&
                        <div className="text-danger">Answer will be available at {formatDate(currQuiz.whenToShowAnswers)}</div>}
                    {currentUser.role == "STUDENT" && currQuiz.showCorrectAnswers != "NEVER" &&
                        (currQuiz.showCorrectAnswers == "RIGHT_AFTER" || new Date() >= new Date(currQuiz.whenToShowAnswers)) &&
                        <CorrectAnswersComponent question={question}/>}
                </div>
            </div>
        </div>
    );
}

function CorrectAnswersComponent({question}: { question: any}) {
    return (
        <div className="wd-quiz-review-correct-answers">
            <div className="mb-2 fw-bold">Correct Answer:</div>
            {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                <label className="ms-2">
                    &nbsp;{question.is_correct? "True":"False"}&nbsp;
                </label></div>}
            {question.questionType == "MULTIPLE_CHOICE" && question.options.filter((option: any) => (option.deleted == false && option.number==question.correctOptionNumber)).map((option: any) => (
                <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                    <label className="col-6 d-flex align-items-center justify-content-start ms-2"
                           htmlFor="wd-quiz-possible-answer">
                        <div className={`col-6 d-flex align-items-center justify-content-start`}>
                            {question.options.find((o: any) => o.number == option.number).text || ""}
                        </div>
                    </label>
                </div>
            ))}
            {question.questionType == "FILL_IN_BLANK" && question.correct_answers.map((answer: any, index: any) => (
                <div>
                    <div className={`wd-question-answer-${index}-row row mb-4`}>
                        <div className="col-1">
                            <label className="d-flex align-items-center justify-content-end"
                                   htmlFor="wd-quiz-possible-answer">
                                {`Blank ${index + 1}: `}
                            </label>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            {answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

