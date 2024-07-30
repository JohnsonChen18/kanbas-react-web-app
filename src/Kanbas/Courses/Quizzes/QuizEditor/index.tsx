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


export default function QuizEditor() {
    const links = ["Details", "Questions"];
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {quizId} = useParams();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {questions} = useSelector((state: any) => state.questionReducer);
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
            <div className="wd-quiz-editor-heading row">
                <div className="wd-quiz-editor-heading-points text-end fw-bold fs-4 col-6">Points {questions.reduce((total:number, question:any) => total + question.points, 0)}</div>
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
        </div>
    );
}