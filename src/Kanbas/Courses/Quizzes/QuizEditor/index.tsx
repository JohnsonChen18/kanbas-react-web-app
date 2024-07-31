import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaCheckCircle} from "react-icons/fa";
import {AiOutlineStop} from "react-icons/ai";
import DetailTab from "./DetailTab";
import QuestionsTab from "./QuestionsTab";
import * as questionClient from "../../Questions/client";
import {setQuestions} from "../../Questions/reducer";
import * as client from "../client";
import {updateQuiz} from "../reducer";
import {FaPlus} from "react-icons/fa6";


export default function QuizEditor() {
    const links = ["Details", "Questions"];
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {cid,quizId} = useParams();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {questions} = useSelector((state: any) => state.questionReducer);
    const totalPoints = questions.filter((question:any)=>question.deleted == false).reduce((total:number, question:any) => total + question.points, 0);
    const [currQuiz, setCurrQuiz] = useState(quizzes.find((quiz: any) => quiz._id === quizId));
    const fetchQuestions = async () => {
        const questions = await questionClient.findQuestionsByQuiz(quizId as string);
        dispatch(setQuestions([...questions].sort((a, b) => a.number - b.number)));
    }
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="wd-quiz-editor">
            <button id="wd-add-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"
                    onClick={() => console.log(questions)}>
                <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                show quiz log
            </button>
            <div className="wd-quiz-editor-heading row">
                <div className="wd-quiz-editor-heading-points text-end fw-bold fs-4 col-6">Points {totalPoints}</div>
                <div className="wd-quiz-editor-heading-publish text-start col-6 d-flex align-items-center">
                    {currQuiz.published ?
                        <div className="fw-bold fs-4 d-flex align-items-center"><FaCheckCircle className="text-success"/>Published</div> :
                        <div className="fw-bold fs-4 d-flex align-items-center"><AiOutlineStop className="text-danger"/>Unpublished</div>}
                </div>
            </div>
            <hr/>
            <div className="wd-quiz-editor-body d-flex flex-column">
                <div className="wd-quiz-editor-body-tab-links d-none d-md-block">
                    <ul className="nav nav-tabs">
                        {links.map(link => (
                            <li className="nav-item">
                                <Link className={`nav-link ${pathname.includes(link) ? "active" : "text-danger"}`}
                                      to={link}>{link}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <br/><br/>
                <div className="wd-quiz-editor-body-tab-content flex-fill">
                    <Routes>
                        <Route path="Details" element={<DetailTab quiz={currQuiz} setQuiz={setCurrQuiz}/>}/>
                        <Route path="Questions/*" element={<QuestionsTab quiz={currQuiz} setQuiz={setCurrQuiz}/>}/>
                    </Routes>
                </div>
            </div>
            <Routes>
                <Route path="Details" element={<ControlButtons quiz={currQuiz} setQuiz={setCurrQuiz}/>}/>
                <Route path="Questions" element={<ControlButtons quiz={currQuiz} setQuiz={setCurrQuiz}/>}/>
            </Routes>
        </div>
    );
}


function ControlButtons({quiz, setQuiz}: { quiz: any, setQuiz: any }) {
    const {cid, quizId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {questions} = useSelector((state: any) => state.questionReducer);
    const totalPoints = questions.filter((question:any)=>question.deleted == false).reduce((total:number, question:any) => total + question.points, 0);
    const questionCount = questions.filter((question:any)=>question.deleted == false).length;
    const [isDisabled, setIsDisabled] = useState(false);
    const saveQuiz = async (quiz: any) => {
        quiz = {...quiz, points:totalPoints, questionCount:questionCount};
        await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };
    const saveQuestions = async (questions:any)=>{
        questionClient.updateQuestions(questions);
        dispatch(setQuestions(questions));
    }
    const handleSaveClick = async () => {
        if (isDisabled) return;
        setIsDisabled(true);
        saveQuiz(quiz);
        saveQuestions(questions);
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
            saveQuestions(questions);
            return updatedQuiz;
        });
        setTimeout(() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
        }, 500);
    };
    return (
        <div className="wd=quiz-editor-control-buttons">
            <hr/>
            <div className="wd-quiz-editor-button-row col-7">

                <button id="wd-save-quiz-btn" className="btn btn-lg btn-success mb-2 mb-md-0 float-end"
                        onClick={handleSavePublishClick} disabled={isDisabled}>
                    Save & Publish
                </button>
                <button id="wd-save-quiz-btn" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0 float-end"
                        onClick={handleSaveClick} disabled={isDisabled}>
                    Save
                </button>
                <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                    <button id="wd-cancel-quiz-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                        Cancel
                    </button>
                </a>
            </div>
        </div>

    );
}