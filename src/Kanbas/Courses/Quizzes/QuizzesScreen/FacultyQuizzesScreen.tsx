import {FaPlus} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {addQuiz, deleteQuiz, setQuizzes, updateQuiz} from "../reducer";
import * as client from "../client";
import {BsGripVertical, BsThreeDotsVertical} from "react-icons/bs";
import {MdOutlineAssignment} from "react-icons/md";
import {IoMdArrowDropdown} from "react-icons/io";
import {AiOutlineStop} from "react-icons/ai";
import {FaCheckCircle} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function FacultyQuizzesScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cid} = useParams();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const [showOptions, setShowOptions] = useState<string | null>(null);
    const [currQuiz, setCurrQuiz] = useState({name: "DEFAULT_NAME", published: false});
    const toggleOptions = (id: string) => {
        setShowOptions(prevId => (prevId === id ? null : id));
    };
    const createQuiz = async (quiz: any) => {
        const newQuiz = await client.createQuiz(quiz);
        dispatch(addQuiz(newQuiz));
        // console.log(quizzes);
        // console.log(newQuiz);
        return newQuiz;
    };
    const removeQuiz = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };

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

    const handleAddButtonClick = async () => {
        const currentDate = new Date();
        const quiz = {
            course: cid,
            name: "DEFAULT_QUIZ_NAME",
            availableDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // one day after
            dueDate: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000), // two day after
            untilDate: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000), // three day after
        };
        const newQuiz = await createQuiz(quiz);
        navigate(`${newQuiz._id}`);
    };

    const flipPublish = (quiz: any) => {
        const currState = quiz.published;
        setCurrQuiz({...quiz, published: !currState});
        setShowOptions(null);
    };
    useEffect(() => {
        if (currQuiz) {
            dispatch(updateQuiz(currQuiz));
            client.updateQuiz(currQuiz);
        }
    }, [currQuiz]);

    return (
        <div className="wd-quiz-screen-faculty">
            <button id="wd-add-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"
                    onClick={handleAddButtonClick}>
                <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                Quiz
            </button>
            {/*<button id="wd-add-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"*/}
            {/*        onClick={() => console.log(quizzes)}>*/}
            {/*    <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>*/}
            {/*    show quiz log*/}
            {/*</button>*/}
            <br/><br/><br/>
            <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="fs-3"/>
                <IoMdArrowDropdown className="me-2 fs-4"/>
                <div className="flex-grow-1 fw-bold">{`QUIZZES (${quizzes.length})`}</div>
            </div>
            <ul className="wd-quizzes-list list-group rounded-0">
                {quizzes.map((quiz: any) => (
                    <li className="wd-quiz-list-item d-flex align-items-center list-group-item p-3 ps-1">
                        <div className="wd-quiz-icon-left me-2 fs-3">
                            <MdOutlineAssignment className="text-success"/>
                        </div>
                        <div className="flex-grow-1">
                            <a className="wd-assignment-link"
                               href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
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
                        </div>
                        <div className="wd-quiz-icon-right me-2 fs-3">
                            {quiz.published ?
                                <button className="btn btn-lg text-success" onClick={() => flipPublish(quiz)}>
                                    <FaCheckCircle/></button> :
                                <button className="btn btn-lg text-danger" onClick={() => flipPublish(quiz)}>
                                    <AiOutlineStop/></button>}
                            <button className="btn btn-light" onClick={() => toggleOptions(quiz._id)}>
                                <BsThreeDotsVertical/></button>
                            {showOptions === quiz._id && (
                                <div className="dropdown-menu show" style={{width: '50x'}}>
                                    <button className="dropdown-item fw-bold" onClick={() => navigate(`${quiz._id}`)}>
                                        Edit
                                    </button>
                                    <button className="dropdown-item fw-bold "
                                            onClick={() => flipPublish(quiz)}>
                                        {quiz.published ? <span>Unpublish</span> : <span>Publish</span>}
                                    </button>
                                    <button className="dropdown-item fw-bold text-danger"
                                            onClick={() => removeQuiz(quiz._id)}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}