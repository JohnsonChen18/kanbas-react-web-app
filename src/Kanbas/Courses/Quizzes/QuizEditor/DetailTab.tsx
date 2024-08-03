import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import * as client from "../client";
import {useDispatch} from "react-redux";
import {updateQuiz} from "../reducer";
import * as questionClient from "../../Questions/client";
import {setQuestions} from "../../Questions/reducer";

export default function DetailTab({quiz, setQuiz}: { quiz: any, setQuiz: any }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cid, quizId} = useParams();
    const [showMaxAttempts, setShowMaxAttempts] = React.useState(quiz.multipleAttempts);
    const [showWhenShowAnswers, setShowWhenShowAnswers] = React.useState(quiz.showCorrectAnswers);
    const [isDisabled, setIsDisabled] = useState(false);
    function formatDateTimeLocal(dateTimeString: string): string {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    function formatToDatabase(dateTimeLocal: string):string {
        const date = new Date(dateTimeLocal);
        return date.toISOString();
    }
    const saveQuiz = async (quiz: any) => {
        await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };
    const handleSaveClick = () => {
        if (isDisabled) return;
        setIsDisabled(true);
        saveQuiz(quiz);
        setTimeout(() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
        }, 500);
    };
    const handleSavePublishClick = () => {
        if (isDisabled) return;
        setIsDisabled(true);
        setQuiz((prevQuiz:any) => {
            const updatedQuiz = {...prevQuiz, published: true};
            saveQuiz(updatedQuiz);  // Call saveQuiz with the updated quiz
            return updatedQuiz;
        });
        setTimeout(() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
        }, 500);
    };
    const handleMaxAttemptsChange = (e:any) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setQuiz({ ...quiz, maxAttempts: value });
        } else {
            setQuiz({ ...quiz, maxAttempts: 1 });
        }
    };
    const handleTimeLimitChange = (e:any) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setQuiz({ ...quiz, timeLimit: value });
        } else {
            setQuiz({ ...quiz, timeLimit: 1 });
        }
    };

    return (
        <div className="wd-quiz-editor-detail-tab d-grid">
            <div className="wd-quiz-name-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-name">
                    Quiz Name
                </label><br/>
                <input id="wd-quiz-name" className="form-control customized-boarder w-25 col-9 align-items-center justify-content-start"
                       value={quiz.name}
                       onChange={(e) => setQuiz({...quiz, name: e.target.value})}/>
            </div>
            <div className="wd-quiz-description-row row mb-4">
                <label className="col-3 d-flex align-items-baseline justify-content-end fw-bold" htmlFor="wd-quiz-name">
                    Quiz Description
                </label>
                <textarea id="wd-quiz-description" className="w-50 col-9 form-control customized-boarder justify-content-start"
                          style={{height: '200px'}}
                          onChange={(e) => setQuiz({...quiz, description: e.target.value})}>
                {quiz.description}
                </textarea>
            </div>
            <div className="wd-quiz-type-row row mb-4">
                <label className="form-label col-3 text-end pt-2 fw-bold" htmlFor="wd-quiz-type">Quiz Type</label>
                <select className="col-9 form-select form-control text-start customized-boarder custom-width w-25" id="wd-quiz-type"
                        onChange={(e) => setQuiz({...quiz, quizType: e.target.value})}>
                    <option selected={quiz.quizType === "GRADED_QUIZ"} value="GRADED_QUIZ">Graded Quiz</option>
                    <option selected={quiz.quizType === "PRACTICE_QUIZ"} value="PRACTICE_QUIZ">Practice Quiz</option>
                    <option selected={quiz.quizType === "GRADED_SURVEY"} value="GRADED_SURVEY">Graded Survey</option>
                    <option selected={quiz.quizType === "UNGRADED_SURVEY"} value="UNGRADED_SURVEY">Ungraded Survey</option>
                </select>
            </div>
            <div className="wd-quiz-group-row row mb-4">
                <label className="form-label col-3 text-end pt-2 fw-bold" htmlFor="wd-quiz-group">Assignment Group</label>
                <select className="col-9 form-select form-control text-start customized-boarder custom-width w-25" id="wd-quiz-group"
                        onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value})}>
                    <option selected={quiz.assignmentGroup === "QUIZZES"} value="QUIZZES">Quizzes</option>
                    <option selected={quiz.assignmentGroup === "EXAMS"} value="EXAMS">Exams</option>
                    <option selected={quiz.assignmentGroup === "ASSIGNMENTS"} value="ASSIGNMENTS">Assignments</option>
                    <option selected={quiz.assignmentGroup === "PROJECTS"} value="PROJECTS">Projects</option>
                </select>
            </div>
            <div className="wd-quiz-shuffle-answer-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-shuffle-answer">
                    Shuffle Answers
                </label><br/>
                <div className="col-9 align-items-center justify-content-start">
                    <input type="checkbox" id="wd-quiz-shuffle-answer" checked={quiz.shuffleAnswers}
                           onChange={(e) => setQuiz({...quiz, shuffleAnswers: e.target.checked})}/>
                </div>
            </div>
            <div className="wd-quiz-time-limit-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-time-limit">
                    Time Limit
                </label>
                <input type="number" min="1" id="wd-quiz-time-limit"
                       className="form-control customized-boarder col-3 align-items-center justify-content-start"
                       value={quiz.timeLimit} style={{width: '85px'}}
                       onChange={handleTimeLimitChange}/>
                <span className="d-flex col-3 align-items-center justify-content-start">Minutes</span>
            </div>
            <div className="wd-quiz-multiple-attempts-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-multiple-attempts">
                    Multiple Attempts
                </label><br/>
                <div className="col-3 align-items-center justify-content-start">
                    <input type="checkbox" id="wd-quiz-multiple-attempts" checked={quiz.multipleAttempts}
                           onChange={(e) => {
                               setQuiz({...quiz, multipleAttempts: e.target.checked});
                               setShowMaxAttempts(e.target.checked)
                           }}/>
                </div>
            </div>
            {showMaxAttempts && <div className="wd-quiz-max-attempts-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold"
                       htmlFor="wd-quiz-max-attempts" style={{textDecoration: 'underline'}}>
                    Max Attempts
                </label>
                <input type="number" min="1" id="wd-quiz-max-attempts"
                       className="form-control customized-boarder col-3 align-items-center justify-content-start"
                       value={quiz.maxAttempts} style={{width: '85px'}}
                       onChange={handleMaxAttemptsChange}/>
            </div>}
            <div className="wd-quiz-show-answers-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-show-answers">
                    Show Correct Answers
                </label><br/>
                <select className="col-9 form-select form-control text-start customized-boarder custom-width w-25"
                        id="wd-quiz-show-answers"
                        onChange={(e) => setQuiz({...quiz, showCorrectAnswers: e.target.value})}>
                    <option selected={quiz.showCorrectAnswers === "NEVER"} value="NEVER">No</option>
                    <option selected={quiz.showCorrectAnswers === "RIGHT_AFTER"} value="RIGHT_AFTER">Right after quiz</option>
                    <option selected={quiz.showCorrectAnswers === "SET_TIME"} value="SET_TIME">Set a specific time</option>
                </select>
                {/*<div className="col-3 align-items-center justify-content-start">*/}
                {/*    <input type="checkbox" id="wd-quiz-show-answers" checked={quiz.showCorrectAnswers}*/}
                {/*           onChange={(e) => {*/}
                {/*               setQuiz({...quiz, showCorrectAnswers: e.target.checked});*/}
                {/*               setShowWhenShowAnswers(e.target.checked)*/}
                {/*           }}/>*/}
                {/*</div>*/}
            </div>
            {quiz.showCorrectAnswers === "SET_TIME" && <div className="wd-quiz-when-show-answers-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold"
                       htmlFor="wd-quiz-when-show-answers" style={{textDecoration: 'underline'}}>
                    When to Show Correct Answers
                </label>
                <div className="col-6 d-flex align-items-center justify-content-start w-25">
                    <input className="customized-boarder form-control"
                           type="datetime-local"
                           id="wd-quiz-when-show-answers"
                           value={formatDateTimeLocal(quiz.whenToShowAnswers)}
                           onChange={(e) => setQuiz({...quiz, whenToShowAnswers: formatToDatabase(e.target.value)})}/>
                </div>
            </div>}
            <div className="wd-quiz-access-code-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-access-code">
                    Access Code
                </label><br/>
                <input id="wd-quiz-access-code"
                       className="form-control customized-boarder w-25 col-9 align-items-center justify-content-start"
                       value={quiz.accessCode} placeholder="To disable access code, just leave this blank"
                       onChange={(e) => setQuiz({...quiz, accessCode: e.target.value})}/>
            </div>
            <div className="wd-quiz-one-question-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-one-question">
                    One Question at a Time
                </label><br/>
                <div className="col-9 align-items-center justify-content-start">
                    <input type="checkbox" id="wd-quiz-one-question" checked={quiz.oneQuestionLimit}
                           onChange={(e) => setQuiz({...quiz, oneQuestionLimit: e.target.checked})}/>
                </div>
            </div>
            <div className="wd-quiz-webcam-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-webcam">
                    Webcam Required
                </label><br/>
                <div className="col-9 align-items-center justify-content-start">
                    <input type="checkbox" id="wd-quiz-webcam" checked={quiz.webCam}
                           onChange={(e) => setQuiz({...quiz, webCam: e.target.checked})}/>
                </div>
            </div>
            <div className="wd-quiz-lock-question-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-lock-question">
                    Lock Questions After Answering
                </label><br/>
                <div className="col-9 align-items-center justify-content-start">
                    <input type="checkbox" id="wd-quiz-lock-question" checked={quiz.lockQuestion}
                           onChange={(e) => setQuiz({...quiz, lockQuestion: e.target.checked})}/>
                </div>
            </div>
            <div className="wd-quiz-assign row mt-2 mb-2">
                <label className="form-label col-3 text-end pt-1" htmlFor="wd-assign-to">Assign</label>
                <div className="card col-9 w-50 customized-boarder custom-width">
                    {/*assign to*/}
                    <label className="form-label col-4 text-start fw-bold mt-2 mb-0" htmlFor="wd-assign-to"
                           data-role="tagsinput">Assign to</label>
                    <input className="customized-boarder form-control text-start" id="wd-assign-to"
                           value={"Everyone"}/>
                    {/*due*/}
                    <label className="form-label col-4 text-start fw-bold mt-2 mb-0"
                           htmlFor="wd-quiz-due-date">Due</label>
                    <input className="customized-boarder form-control text-start"
                           type="datetime-local"
                           id="wd-quiz-due-date"
                           value={formatDateTimeLocal(quiz.dueDate)}
                           onChange={(e) => setQuiz({...quiz, dueDate: formatToDatabase(e.target.value)})}/>
                    {/*available from until*/}
                    <div className="row mt-2 mb-2">
                        <div className="col-6">
                            <label className="form-label text-start mb-0 pt-1 fw-bold" htmlFor="wd-available-from">
                                Available from</label><br/>
                            <input className="form-control customized-boarder text-start form-control"
                                   type="datetime-local"
                                   id="wd-available-from"
                                   value={formatDateTimeLocal(quiz.availableDate)}
                                   onChange={(e) => setQuiz({...quiz, availableDate: formatToDatabase(e.target.value)})}/>
                        </div>
                        <div className="col-6">
                            <label className="form-label text-start mb-0 pt-1 fw-bold" htmlFor="wd-available-until">
                                Until</label><br/>
                            <input className="form-control customized-boarder text-start form-control "
                                   type="datetime-local"
                                   id="wd-available-until"
                                   value={formatDateTimeLocal(quiz.untilDate)}
                                   onChange={(e) => setQuiz({...quiz, untilDate: formatToDatabase(e.target.value)})}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<hr/>*/}
            {/*<div className="wd-editor-buttons-row col-7 mb-4">*/}
            {/*    <button id="wd-save-quiz-btn" className="btn btn-lg btn-success mb-2 mb-md-0 float-end"*/}
            {/*            onClick={handleSavePublishClick} disabled={isDisabled}>*/}
            {/*        Save & Publish*/}
            {/*    </button>*/}
            {/*    <button id="wd-save-quiz-btn" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0 float-end"*/}
            {/*            onClick={handleSaveClick} disabled={isDisabled}>*/}
            {/*        Save*/}
            {/*    </button>*/}
            {/*    <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>*/}
            {/*        <button id="wd-cancel-quiz-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">*/}
            {/*            Cancel*/}
            {/*        </button>*/}
            {/*    </a>*/}
            {/*</div>*/}
        </div>
    );
}