import {FaPlus} from "react-icons/fa6";
import {BsGripVertical, BsThreeDotsVertical} from "react-icons/bs";
import {IoMdArrowDropdown} from "react-icons/io";
import {MdOutlineAssignment} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";
import {AiOutlineStop} from "react-icons/ai";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as quizRecordClient from "../QuizRecord/client";
import {useNavigate} from "react-router-dom";

export default function StudentQuizzesScreen(){
    const navigate = useNavigate();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [scoreArr, setScoreArr] = useState( [] as any);
    const {cid} = useParams();
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
    const handleQuizNameClick = async (quiz:any) => {
        if(new Date() >= new Date(quiz.untilDate)) {
            alert("Quiz is closed. You cant view it anymore.")
            return;
        }
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    // const fetchAttempts = async () => {
    //     const attempts = await quizRecordClient.findAttemptsForOneQuiz(currentUser._id as string, quizId as string);
    //     await setAttempts(attempts.sort((a: any, b: any) => {
    //         const dateA = new Date(a.startTime);
    //         const dateB = new Date(b.startTime);
    //
    //         if (dateA > dateB) return -1;
    //         if (dateA < dateB) return 1;
    //         return 0;
    //     }));
    // }
    useEffect(() => {
        const fetchAttempts = async () => {
            const attempts = await Promise.all(quizzes.filter((quiz:any)=> quiz.published).map(async (quiz: any) => {
                const attempts = await quizRecordClient.findAttemptsForOneQuiz(currentUser._id as string, quiz._id as string);
                attempts.sort((a: any, b: any) => {
                    const dateA = new Date(a.startTime);
                    const dateB = new Date(b.startTime);

                    if (dateA > dateB) return -1;
                    if (dateA < dateB) return 1;
                    return 0;
                });
                return attempts[0] ? attempts[0] : undefined;
            }));
            setScoreArr(attempts);
        };

        fetchAttempts();
    }, [quizzes]);


    return (
        <div className="wd-quiz-screen-faculty">
            {/*<button id="wd-add-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"*/}
            {/*        onClick={() => console.log(quizzes)}>*/}
            {/*    <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>*/}
            {/*    show quiz log*/}
            {/*</button>*/}
            <br/><br/><br/>
            <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="fs-3"/>
                <IoMdArrowDropdown className="me-2 fs-4"/>
                <div className="flex-grow-1 fw-bold">{`QUIZZES (${quizzes.filter((quiz:any)=> quiz.published == true).length})`}</div>
            </div>
            <ul className="wd-quizzes-list list-group rounded-0">
                {quizzes.filter((quiz:any)=> quiz.published).map((quiz: any, index:number) => (
                    <li className="wd-quiz-list-item d-flex align-items-center list-group-item p-3 ps-1">
                        <div className="wd-quiz-icon-left me-2 fs-3">
                            <MdOutlineAssignment className="text-success"/>
                        </div>
                        <div className="flex-grow-1">
                            <a className="wd-assignment-link"
                               onClick={()=>handleQuizNameClick(quiz)}
                               style={{ cursor: 'pointer' }}
                               // href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                            >
                                {quiz.name}
                            </a>
                            <br/>
                            {new Date() < new Date(quiz.availableDate) &&
                                <span className="wd-quiz-list-item-start-time">
                                        <span className="fw-bolder">Not available until </span>
                                    {formatDate(quiz.availableDate)}
                            </span>}
                            {new Date() >= new Date(quiz.availableDate) && new Date() <= new Date(quiz.untilDate) &&
                                <span className="wd-quiz-list-item-end-time">
                                        <span className="fw-bolder">Available until </span>
                                    {formatDate(quiz.untilDate)}
                            </span>}
                            {new Date() > new Date(quiz.untilDate) &&
                                <span className="wd-quiz-list-item-end-time">
                                    <span className="fw-bolder">CLOSED</span>
                            </span>}
                            &nbsp;|&nbsp;

                            <span className="wd-assignment-list-item-end-time">
                                <span className="fw-bolder">Due </span>
                                {formatDate(quiz.dueDate)}
                            </span>
                            &nbsp;|&nbsp;
                            <span className="wd-assignment-list-item-points ">
                                {quiz.points}<span className="fw-bolder">pts</span>
                            </span>
                            &nbsp;|&nbsp;
                            <span className="wd-assignment-list-item-question-count ">
                                {quiz.questionCount}<span className="fw-bolder"> Questions</span>
                            </span>
                            &nbsp;|&nbsp;
                            <span className="wd-assignment-list-item-score ">
                                <span className="fw-bolder">Score: </span>{scoreArr[index]? scoreArr[index].grade: "N/A"}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}