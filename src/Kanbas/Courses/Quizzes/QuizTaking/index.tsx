import * as questionClient from "../../Questions/client";
import {setQuestions} from "../../Questions/reducer";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useParams} from "react-router";
import * as quizRecordClient from "../QuizRecord/client"
import accountReducer from "../../../Account/reducer";
import {createQuizRecord, updateOneQuestionRecord} from "../QuizRecord/reducer";
import {useNavigate} from "react-router-dom";

interface Question {
    title: string;
    text: string;
    questionType: string;
    is_correct: boolean;
}

export default function QuizTaking() {
    const navigate = useNavigate();
    const {cid, quizId, questionIndex} = useParams();
    const dispatch = useDispatch();
    const {quizzes} = useSelector((state: any) => state.quizReducer);
    const {questions} = useSelector((state: any) => state.questionReducer);
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {quizRecord} = useSelector((state: any) => state.quizRecordReducer);
    const [currQuiz, setCurrQuiz] = useState(quizzes.find((quiz: any) => quiz._id === quizId));
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(currQuiz.timeLimit * 60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmitClick = async () => {
        setIsSubmitted(true);
        await quizRecordClient.createQuizRecord(quizRecord, questions);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
    };
    const createNewQuizRecord = async () => {
        const userId = currentUser._id;
        await dispatch(createQuizRecord({questions, quizId, userId}));
    };

    useEffect(() => {
        const init = async () => {
            await createNewQuizRecord();
        };
        init();
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && !isSubmitted) {
            handleSubmitClick();
        }

        const timer = timeLeft > 0 ? setInterval(() => setTimeLeft(timeLeft - 1), 1000) : null;

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timeLeft, isSubmitted]);

    return (
        <div className="wd-quiz-view-screen">
            <div className="wd-quiz-view-quiz-name">
                <h2>{currQuiz.name}</h2>
                <h3><div className="text-danger">{`Time Left: ${Math.floor(timeLeft / 60)} Min ${timeLeft%60} Sec`}</div></h3>
                <div className="btn" onClick={() => console.log(quizRecord)}> show quiz record</div>
                <div className="btn" onClick={() => console.log(questions)}> show questions</div>
            </div>
            {currentUser.role == "FACULTY" && <div id="wd-quiz-view-prompt" className="alert alert-danger mb-2 me-2 fs-6 text-center">
                You are currently in preview mode as a faculty. To edit, click &nbsp;
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${currQuiz._id}/Details`}>EDIT</a>
            </div>}
            {currQuiz.lockQuestion && <div id="wd-quiz-view-prompt" className="alert alert-secondary mb-2 me-2 text-center fs-5">
                Question Lock is activated. You can't go back to previous questions.
            </div>}
            {currQuiz.oneQuestionLimit && <QuestionContainer question={questions[currQuestionIndex]} quiz={currQuiz}/>}
            {!currQuiz.oneQuestionLimit && questions.map((q: any) => (
                <QuestionContainer key={q._id} question={q} quiz={currQuiz}/>
            ))}
            <hr/>
            <div className="wd-quiz-view-buttons-row row mb-4">
                <div className="col-4">
                    {!currQuiz.lockQuestion && currQuiz.oneQuestionLimit && currQuestionIndex > 0 &&
                        <button id="wd-quiz-pre-btn" className="btn btn-lg btn-secondary mb-2 ms-4 mb-md-0 float-start"
                                onClick={() => setCurrQuestionIndex(currQuestionIndex - 1)}>
                            Pre
                        </button>}
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <button id="wd-quiz-pre-btn" className="btn btn-lg btn-danger mb-2 mb-md-0" onClick={handleSubmitClick}>
                        SUBMIT QUIZ
                    </button>
                </div>
                <div className="col-4">
                    {currQuiz.oneQuestionLimit && currQuestionIndex < questions.length - 1 &&
                        <button id="wd-quiz-next-btn" className="btn btn-lg btn-secondary me-4 mb-2 mb-md-0 float-end"
                                onClick={() => setCurrQuestionIndex(currQuestionIndex + 1)}>
                            Next
                        </button>}
                </div>
            </div>
            {!currQuiz.lockQuestion && <div className="wd-quiz-view-jump-buttons d-grid">
                <div className="wd-quiz-view-jump-row text-start text-danger"><h3>Jump To:</h3></div>
                {questions.map((question: any, index: number) => (
                    <div className="wd-quiz-view-jump-buttons-row text-start">
                        <span onClick={() => setCurrQuestionIndex(index)}
                              style={{color: 'red', cursor: 'pointer', textDecoration: 'underline'}}>
                            Question {index + 1}
                        </span>
                    </div>
                ))}
            </div>}
        </div>
    );
}


function QuestionContainer({question, quiz}: {
    question: any,
    quiz: any,
}) {
    const dispatch = useDispatch();
    const {quizRecord} = useSelector((state: any) => state.quizRecordReducer);
    const questionRecords = quizRecord.questionRecords;
    const [currRecord, setCurrRecord] = useState<any>({});
    const [optionArr, setOptionArr] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [shuffled, setShuffled] = useState(false);
    const saveRecordChange = async (newRecord: any) => {
        dispatch(updateOneQuestionRecord(newRecord));
    };

    const handleTrueClick = async () => {
        await saveRecordChange({...currRecord, selectedTrueFalse: true});
        setCurrRecord({...currRecord, selectedTrueFalse: true});
    };
    const handleFalseClick = async () => {
        await saveRecordChange({...currRecord, selectedTrueFalse: false});
        setCurrRecord({...currRecord, selectedTrueFalse: false});
    };
    const handleOptionChange = async (optionNumber: any) => {
        await saveRecordChange({...currRecord, selectedOptionNumber: optionNumber});
        setCurrRecord({...currRecord, selectedOptionNumber: optionNumber});
    };
    const handleFillInAnswerChange = async (e: any, answerIndex: any) => {
        const fillInArray = currRecord.fillInBlankAnswers.map((answer: any, index: number) => index == answerIndex ? e.target.value : answer);
        await saveRecordChange({...currRecord, fillInBlankAnswers: fillInArray});
        setCurrRecord({...currRecord, fillInBlankAnswers: fillInArray});
    };
    const shuffleArray = (array:any[]) => {
        let newArray = array.slice();
        newArray.sort(() => Math.random() - 0.5);
        return newArray;
    };
    useEffect(() => {
        if (question && quizRecord.questionRecords) {
            const currQuestionRecord = quizRecord.questionRecords.find((record: any) => record.questionId === question._id);

            if(quiz.shuffleAnswers && !shuffled){
                console.log(question.options);
                setOptionArr(shuffleArray(question.options));
                setShuffled(true);
            }

            if (currQuestionRecord) {
                setCurrRecord(currQuestionRecord);
            }
            setLoading(false);
        }
    }, [question, quiz,quizRecord.questionRecords]);

    useEffect( () => {
        setShuffled(false);
    }, [question._id]);

    if (loading) return <div>Loading...</div>;
    if (currRecord == undefined) return <div>undefined currRecord</div>;
    // if (currRecord.fillInBlankAnswers == undefined) return <div>undefined question</div>;

    return (
        <div className="wd-quiz-view-content-container container">
            <a className="btn" onClick={() => console.log(currRecord)}>show curr question record</a>
            <a className="btn" onClick={() => console.log(shuffled)}>show optionarr</a>
            <div className="card">
                <div className="card-header bg-light fw-bolder">
                    <h3>{question.title && question.title}</h3>
                </div>
                <div className="card-body">
                    <p className="mb-5">
                        <div
                            dangerouslySetInnerHTML={{__html: question.text}}
                        />
                        {/*{question.text && question.text}*/}
                    </p>
                    {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                        <label className="fw-bold ms-2">
                            <input
                                type="radio"
                                checked={currRecord.selectedTrueFalse == undefined ? false : currRecord.selectedTrueFalse}
                                onChange={handleTrueClick}
                            />
                            &nbsp;True&nbsp;
                        </label></div>}
                    {question.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-2">
                        <label className="fw-bold ms-2">
                            <input
                                type="radio"
                                checked={currRecord.selectedTrueFalse == undefined ? false : !currRecord.selectedTrueFalse}
                                onChange={handleFalseClick}
                            />
                            &nbsp;False&nbsp;
                        </label></div>}
                    {question.questionType == "MULTIPLE_CHOICE" && quiz.shuffleAnswers &&
                       optionArr.filter((option: any) => (option.deleted == false)).map((option: any) => (
                            <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                                <label className="col-6 d-flex align-items-center justify-content-start fw-bold"
                                       htmlFor="wd-quiz-possible-answer">
                                    <input
                                        type="radio"
                                        checked={currRecord.selectedOptionNumber ? currRecord.selectedOptionNumber == option.number : false}
                                        onChange={() => handleOptionChange(option.number)}
                                    />&nbsp;
                                    <div className={`col-6 d-flex align-items-center justify-content-start`}>
                                        {question.options.find((o: any) => o.number == option.number) &&
                                            question.options.find((o: any) => o.number == option.number).text || ""}
                                    </div>
                                </label>
                            </div>
                        ))}
                    {question.questionType == "MULTIPLE_CHOICE" && !quiz.shuffleAnswers &&
                        question.options.filter((option: any) => (option.deleted == false)).sort((a:any, b:any) => a.number - b.number).map((option: any) => (
                            <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                                <label className="col-6 d-flex align-items-center justify-content-start fw-bold"
                                       htmlFor="wd-quiz-possible-answer">
                                    <input
                                        type="radio"
                                        checked={currRecord.selectedOptionNumber ? currRecord.selectedOptionNumber == option.number : false}
                                        onChange={() => handleOptionChange(option.number)}
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
                                    <label className="d-flex align-items-center justify-content-end fw-bold mt-2"
                                           htmlFor="wd-quiz-possible-answer">
                                        {`Answer ${index + 1}: `}
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input id="wd-question-answer"
                                           className="form-control customized-boarder w-50 d-flex align-items-center justify-content-start"
                                           value={currRecord.fillInBlankAnswers && currRecord.fillInBlankAnswers[index] ? currRecord.fillInBlankAnswers[index] : ""}
                                           onChange={(e) => handleFillInAnswerChange(e, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}