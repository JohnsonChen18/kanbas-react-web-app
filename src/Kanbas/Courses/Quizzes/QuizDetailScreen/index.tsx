import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa6";
import {FaCheckCircle} from "react-icons/fa";
import {AiOutlineStop} from "react-icons/ai";
import {createQuizRecord} from "../QuizRecord/reducer";
import * as questionClient from "../../Questions/client";
import * as quizRecordClient from "../QuizRecord/client";
import {setQuestions} from "../../Questions/reducer";
import {findAttemptsForOneQuiz} from "../QuizRecord/client";
import {useNavigate} from "react-router-dom";

export default function QuizDetailScreen() {
    interface Attempt {
        startTime: string;
        grade: string
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {quizId, cid} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {questions} = useSelector((state: any) => state.questionReducer);
    const {quizRecord} = useSelector((state: any) => state.quizRecordReducer);
    const [currQuiz, setCurrQuiz] = useState(quizzes.find((quiz: any) => quiz._id === quizId));
    const [attempts, setAttempts] = useState<[Attempt]>([] as any);
    const [currAccessCode, setCurrAccessCode] = useState("");

    function formatQuizType(input: String) {
        const words = input.toLowerCase().split('_');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(' ');
    }

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

    const fetchQuestions = async () => {
        const questions = await questionClient.findQuestionsByQuiz(quizId as string);
        await dispatch(setQuestions([...questions].filter((question: any) => question.deleted == false).sort((a, b) => a.number - b.number)));
    }
    const fetchAttempts = async () => {
        const attempts = await quizRecordClient.findAttemptsForOneQuiz(currentUser._id as string, quizId as string);
        await setAttempts(attempts.sort((a: any, b: any) => {
            const dateA = new Date(a.startTime);
            const dateB = new Date(b.startTime);

            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;
            return 0;
        }));
    }
    const handleTakeQuizClick = async () => {
        if(currQuiz.accessCode != "" && currAccessCode != currQuiz.accessCode){
            alert("Wrong Access Code");
            return;
        }
        if(attempts.length >= currQuiz.maxAttempts){
            alert("Run out of attempts");
            return;
        }

        navigate(`/Kanbas/Courses/${cid}/Quizzes/Taking/${currQuiz._id}`);
    };
    useEffect(() => {
        fetchQuestions();
        fetchAttempts();
    }, []);


    return (
        <div className="wd-quiz-detail">
            <div className="wd-quiz-detail-buttons d-grid">
                {currentUser.role === "FACULTY" &&
                    <div className="wd-quiz-detail-faculty-button-row row">
                        <div className="wd-quiz-detail-faculty-button col-6">
                            <a id="wd-edit-quiz-btn" className="float-end btn btn-lg btn-secondary mb-2 mb-md-0"
                               href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${currQuiz._id}/Details`}>
                                Edit
                            </a>
                            <a id="wd-preview-quiz-btn" className="float-end btn btn-lg btn-secondary mb-2 me-2 mb-md-0"
                               href={`#/Kanbas/Courses/${cid}/Quizzes/Taking/${currQuiz._id}`}>
                                Preview
                            </a>
                        </div>
                        <div className="wd-quiz-editor-heading-publish text-start col-6 d-flex align-items-center">
                            {currQuiz.published ?
                                <div className="fw-bold fs-4 d-flex align-items-center"><FaCheckCircle className="text-success"/>Published
                                </div> :
                                <div className="fw-bold fs-4 d-flex align-items-center"><AiOutlineStop className="text-danger"/>Unpublished
                                </div>}
                        </div>
                    </div>}
                {currentUser.role === "STUDENT" &&
                    <div className="wd-quiz-detail-student-button-row row">
                        <div className="wd-quiz-detail-student-button col-6">
                            <a id="wd-take-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"
                               onClick={handleTakeQuizClick}>
                                Take Quiz
                            </a>
                            {currQuiz.accessCode != "" &&
                                <input className="w-25 float-end me-4 align-items-center mt-2 rounded"
                                       type="password"
                                       placeholder="Enter access code"
                                       value={currAccessCode}
                                       onChange={(e) => setCurrAccessCode(e.target.value)}
                                />}
                        </div>
                    </div>}
            </div>
            <div className="wd-quiz-detail-content d-grid">
                <hr/>
                <div className="wd-quiz-detail-titile row">
                    <div className="wd-quiz-detail-title col-6 fw-bolder fs-2 text-end">{currQuiz.name}</div>
                </div>
                <br/>
                <div className="wd-quiz-detail-type row">
                    <div className="col-4 text-end fw-bold">Quiz Type</div>
                    <div className="col-6 text-start">{formatQuizType(currQuiz.quizType)}</div>
                </div>
                <div className="wd-quiz-detail-points row">
                    <div className="col-4 text-end fw-bold">Points</div>
                    <div className="col-6 text-start">{currQuiz.points}</div>
                </div>
                <div className="wd-quiz-detail-group row">
                    <div className="col-4 text-end fw-bold">Assignment Group</div>
                    <div className="col-6 text-start">{currQuiz.assignmentGroup}</div>
                </div>
                <div className="wd-quiz-detail-shuffle row">
                    <div className="col-4 text-end fw-bold">Shuffle Answers</div>
                    <div className="col-6 text-start">{currQuiz.shuffleAnswers ? "Yes" : "No"}</div>
                </div>
                <div className="wd-quiz-detail-time-limit row">
                    <div className="col-4 text-end fw-bold">Time Limit</div>
                    <div className="col-6 text-start">{currQuiz.timeLimit} Minutes</div>
                </div>
                <div className="wd-quiz-detail-multiple-attempts row">
                    <div className="col-4 text-end fw-bold">Multiple Attempts</div>
                    <div className="col-6 text-start">{currQuiz.multipleAttempts ? "Yes" : "No"}</div>
                </div>
                <div className="wd-quiz-detail-max-attempts row">
                    <div className="col-4 text-end fw-bold">Max Attempts</div>
                    <div className="col-6 text-start">{currQuiz.maxAttempts}</div>
                </div>
                <div className="wd-quiz-detail-show-answers row">
                    <div className="col-4 text-end fw-bold">Show Correct Answers</div>
                    <div className="col-6 text-start">{currQuiz.showCorrectAnswers != "NEVER" ?
                        <div className="wd-quiz-detail-when-show-answers">
                            {currQuiz.showCorrectAnswers === "RIGHT_AFTER" && "Right after quiz"}
                            {currQuiz.showCorrectAnswers === "SET_TIME" && formatDate(currQuiz.whenToShowAnswers)}
                        </div> : "No"}
                    </div>
                </div>
                <div className="wd-quiz-detail-access-code row">
                    <div className="col-4 text-end fw-bold">Access Code</div>
                    {currentUser.role == "FACULTY" &&
                        <div className="col-6 text-start">{currQuiz.accessCode == "" ? "N/A" : currQuiz.accessCode}</div>}
                    {currentUser.role == "STUDENT" &&
                        <div className="col-6 text-start">{currQuiz.accessCode == "" ? "N/A" : "Required"}</div>}
                </div>
                <div className="wd-quiz-detail-one-qeustion row">
                    <div className="col-4 text-end fw-bold">One Question at a Time</div>
                    <div className="col-6 text-start">{currQuiz.oneQuestionLimit ? "Yes" : "No"}</div>
                </div>
                <div className="wd-quiz-detail-webcam row">
                    <div className="col-4 text-end fw-bold">Webcam Required</div>
                    <div className="col-6 text-start">{currQuiz.webCam ? "Yes" : "No"}</div>
                </div>
                <div className="wd-quiz-detail-lock-questions row">
                    <div className="col-4 text-end fw-bold">Lock Questions After Answering</div>
                    <div className="col-6 text-start">{currQuiz.lockQuestion ? "Yes" : "No"}</div>
                </div>
                <div className="wd-quiz-detail-description row">
                    <div className="col-4 text-end fw-bold mt-2">Description</div>
                    {/*<div className="col-6 text-start overflow-auto">{currQuiz.description}</div>*/}
                    <textarea id="wd-quiz-description" className="w-50 col-6 form-control justify-content-start"
                              style={{height: '75px', border: '1px solid transparent'}} readOnly>
                        {currQuiz.description}
                    </textarea>
                </div>
            </div>
            <br/>
            <div className="wd-quiz-detail-time d-grid mb-5">
                <div className="wd-quiz-detail-time-title-row row">
                    <div className="wd-quiz-detail-due-date col-4 fw-bolder text-start">Due date</div>
                    <div className="wd-quiz-detail-available-date col-4 fw-bolder text-start">Available date</div>
                    <div className="wd-quiz-detail-until-date col-4 fw-bolder text-start">Until date</div>
                </div>
                <hr/>
                <div className="wd-quiz-detail-time-row row">
                    <div className="wd-quiz-detail-due-date col-4 text-start">{formatDate(currQuiz.dueDate)}</div>
                    <div
                        className="wd-quiz-detail-available-date col-4 text-start">{formatDate(currQuiz.availableDate)}</div>
                    <div className="wd-quiz-detail-until-date col-4 text-start">{formatDate(currQuiz.untilDate)}</div>
                </div>
            </div>

            <div className="wd-quiz-attempt-history d-grid">
                <div className="wd-quiz-detail-time-title-row row d-flex align-items-end">
                    <div className="wd-quiz-detail-due-date col-4 fw-bolder text-start text-danger fs-4">Last Attempt</div>
                    <div className="wd-quiz-detail-available-date col-4 fw-bolder text-start">Start Time</div>
                    <div className="wd-quiz-detail-until-date col-4 fw-bolder text-start">Score</div>
                </div>
                <hr/>
                <div className="wd-quiz-detail-attempt-row row">
                    <div className="wd-quiz-detail-detail-attempt-title col-4 text-start text-danger">
                        {attempts[0] ?
                            <a href={`#/Kanbas/Courses/${cid}/Quizzes/Review/${quizId}/${(attempts[0] as any)._id}`}>Attempt {attempts.length}</a> : "N/A"}
                    </div>
                    <div
                        className="wd-quiz-detail-available-date col-4 text-start">{attempts[0] ? formatDate(attempts[0].startTime) : "N/A"}</div>
                    <div className="wd-quiz-detail-until-date col-4 text-start">{attempts[0] ? attempts[0].grade : "N/A"}</div>
                </div>
                <div id="wd-quiz-view-prompt" className="alert alert-dark mt-2 text-center">
                    {currentUser.role == "FACULTY" && "Note: As a faculty, you can always preview the quiz. But only the last attempt will be listed."}
                    {currentUser.role == "STUDENT" && "Note: As a student, you can not exceed the attempt limit. Your highest score will be recorded." +
                        " You can only review your last attempt."}
                </div>
            </div>

        </div>
    );
}