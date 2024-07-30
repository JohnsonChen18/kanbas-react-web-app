import {useParams} from "react-router";
import React, {useEffect, useReducer, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateQuestion} from "./reducer";
import {useNavigate} from "react-router-dom";

export default function SingleQuestionEditor() {
    const {cid, quizId, questionNumber} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {questions} = useSelector((state: any) => state.questionReducer);
    const [currQuestion, setCurrQuestion] = useState<any | any>();
    const [mode, setMode] = useState("VIEW");
    const [isDisabled, setIsDisabled] = useState(false);
    const handlePointsChange = (e: any) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0) {
            setCurrQuestion({...currQuestion, points: value});
        } else {
            setCurrQuestion({...currQuestion, points: 0});
        }
    };
    const handleOptionChange = (e: any, optionNumber: number) => {
        const updatedText = e.target.value;

        setCurrQuestion((prevState: any) => {
            const updatedOptions = prevState.options.map((option: any) =>
                option.number === optionNumber ? {...option, text: updatedText} : option
            );

            return {...prevState, options: updatedOptions};
        });
    };
    const handleOptionDeleteClick = (optionNumber: number) => {
        setCurrQuestion((prevState: any) => {
            const updatedOptions = prevState.options.map((option: any) =>
                option.number === optionNumber ? {...option, deleted: true} : option
            );

            return {...prevState, options: updatedOptions};
        });
    }
    const handleAddOptionClick = () => {
        setCurrQuestion((prevState: any) => {
            const newOption = {
                text: "DEFAULT_OPTION_DESCRIPTION",
                number: prevState.nextOptionNumber,
                deleted: false,
            };
            const updatedOptions = [...prevState.options, newOption];
            return {
                ...prevState,
                options: updatedOptions,
                nextOptionNumber: prevState.nextOptionNumber + 1,
            };
        });
    };
    const handleAnswerChange = (e: any, targetIndex: number) => {
        const updatedText = e.target.value;
        setCurrQuestion((prevState: any) => {
            const updatedAnswers = prevState.correct_answers.map((answer: string, index: number) =>
                index == targetIndex ? updatedText : answer
            );

            return {...prevState, correct_answers: updatedAnswers};
        });
    }
    const handleAnswerDeleteClick = (targetIndex: number) => {
        setCurrQuestion((prevState: any) => {
            const updatedAnswers = prevState.correct_answers.filter((answer: string, index: number) =>
                index != targetIndex);
            return {...prevState, correct_answers: updatedAnswers};
        });
    }
    const handleAddAnswerClick = () => {
        setCurrQuestion((prevState: any) => {
            const newAnswer = "DEFAULT_ANSWER";
            const updatedAnswers = [...prevState.correct_answers, newAnswer];
            return {
                ...prevState,
                correct_answers: updatedAnswers,
            };
        });
    };
    const handleUpdateClick = () => {
        dispatch(updateQuestion(currQuestion));
        setTimeout(() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/Editor/${quizId}/Questions`);
        }, 500);
    }

    useEffect(() => {
        const question = questions.find((q: any) => (q.number == questionNumber));
        setCurrQuestion(question);
    }, []);

    if (!currQuestion) {
        return <div>Loading...</div>;
    }

    if (mode == "VIEW") {
        return (
            <div className="wd-questions-single-question-editor d-grid">
                <div className="wd-question-mode-switch-row row mb-4">
                    <div className="col-3">
                        {/*<button id="wd-add-option-btn" className="btn btn-lg btn-secondary mb-2 me-2 mb-md-0 float-end"*/}
                        {/*        onClick={() => console.log(currQuestion)}>*/}
                        {/*    Show question detail*/}
                        {/*</button>*/}
                    </div>
                    <div className="wd-question-view-mode col-3 d-flex align-items-center justify-content-center">
                        <button id="wd-question-view-mode-button" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0"
                                onClick={() => setMode("VIEW")}>
                            Switch to View Mode
                        </button>
                    </div>
                    <div className="wd-question-edit-mode col-3 d-flex align-items-center justify-content-center">
                        <button id="wd-question-edit-mode-button" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0"
                                onClick={() => setMode("EDIT")}>
                            Switch to Edit Mode
                        </button>
                    </div>
                </div>
                <div className="wd-question-prompt-row row mb-4">
                    <div className="col-3"></div>
                    <div id="wd-mode-prompt"
                         className="alert alert-secondary col-6 btn-secondary mb-2 me-2 fs-4 fw-bold wfloat-start text-center">
                        You are currently in view mode
                    </div>
                </div>
                <div className="wd-question-title-row row mb-4">
                    <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-name">
                        Question Title
                    </label><br/>
                    <div className="col-6 d-flex align-items-center justify-content-start">
                        {currQuestion.title}
                    </div>
                </div>
                <div className="wd-question-points-row row mb-4">
                    <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-time-limit">
                        Points
                    </label>
                    <div className="col-6 d-flex align-items-center justify-content-start">
                        {currQuestion.points}
                    </div>
                </div>
                <div className="wd-question-type-row row mb-4">
                    <label className="form-label col-3 text-end pt-2 fw-bold" htmlFor="wd-quiz-group">Question Type</label>
                    <div className="col-6 d-flex align-items-center justify-content-start">
                        {currQuestion.questionType === "TRUE_FALSE" && "True or False"}
                        {currQuestion.questionType === "MULTIPLE_CHOICE" && "Multiple Choice"}
                        {currQuestion.questionType === "FILL_IN_BLANK" && "Fill Blank"}
                    </div>
                </div>
                <div className="wd-question-text-row row mb-4">
                    <label className="col-3 d-flex align-items-baseline justify-content-end fw-bold mt-2" htmlFor="wd-question-text">
                        Question Text
                    </label>
                    <textarea id="wd-quiz-description" className="w-50 col-6 form-control justify-content-start"
                              style={{height: '200px', border: '1px solid transparent'}} readOnly>
                        {currQuestion.text}
                    </textarea>
                </div>
                <div className="wd-question-answer-row row">
                    <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-name">
                        Answers:
                    </label>
                </div>
                {currQuestion.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-1">
                    <div className="col-3 d-flex align-items-center justify-content-end fw-bold"/>
                    <div className="col-3 align-items-center justify-content-end text-start fw-bolder fs-4">
                        <label className={currQuestion.is_correct ? "text-success bg-secondary rounded" : ""}>
                            <input
                                type="radio"
                                checked={currQuestion.is_correct}
                            />
                            True&nbsp;
                        </label>
                    </div>
                </div>}
                {currQuestion.questionType == "TRUE_FALSE" && <div className="wd-question-answer-false-row row mb-4">
                    <div className="col-3 d-flex align-items-center justify-content-end fw-bold"/>
                    <div className="col-3 align-items-center justify-content-end text-start fw-bolder fs-4">
                        <label className={currQuestion.is_correct == false ? "text-success bg-secondary rounded" : ""}>
                            <input
                                type="radio"
                                checked={!currQuestion.is_correct}
                            />
                            False&nbsp;
                        </label>
                    </div>
                </div>}
                {currQuestion.questionType == "MULTIPLE_CHOICE" && currQuestion.options.filter((option: any) => option.deleted == false)
                    .map((option: any) => (
                        <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                            <div className="col-3 d-flex align-items-center justify-content-end fw-bold">
                            </div>
                            <label className="col-6 d-flex align-items-center justify-content-start fw-bold"
                                   htmlFor="wd-quiz-possible-answer">
                                Option:&nbsp;
                                <div className={`col-6 d-flex align-items-center justify-content-start 
                                ${currQuestion.correctOptionNumber == option.number? "bg-success": "bg-secondary"}`}>
                                    {currQuestion.options.find((o: any) => o.number == option.number).text || ""}
                                </div>
                            </label>
                        </div>))}
                {currQuestion.questionType == "FILL_IN_BLANK" && currQuestion.correct_answers.map((answer: any, index: number) => (
                    <div className={`wd-question-answer-${index}-row row mb-4`}>
                        <div className="col-3 d-flex align-items-center justify-content-end fw-bold"></div>
                        <label className="col-6 d-flex align-items-center justify-content-start fw-bold" htmlFor="wd-quiz-possible-answer">
                            Answer:&nbsp;
                            <div className="col-6 d-flex align-items-center justify-content-start">
                                {currQuestion.correct_answers[index]}
                            </div>
                        </label>
                    </div>
                    ))}
                <hr/>
                <div className="wd-question-buttons-row col-7 mb-4">
                    <button id="wd-save-quiz-btn" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0 float-end"
                            onClick={handleUpdateClick} disabled={isDisabled}>
                        Update
                    </button>
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${quizId}/Questions`}>
                        <button id="wd-cancel-quiz-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                            Cancel
                        </button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="wd-questions-single-question-editor d-grid">
            <div className="row mb-4">
                <div className="col-3">
                    {/*<button id="wd-add-option-btn" className="btn btn-lg btn-secondary mb-2 me-2 mb-md-0 float-end"*/}
                    {/*        onClick={() => console.log(currQuestion)}>*/}
                    {/*    Show question detail*/}
                    {/*</button>*/}
                </div>
                <div className="wd-question-view-mode col-3 d-flex align-items-center justify-content-center">
                    <button id="wd-question-view-mode-button" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0"
                            onClick={() => setMode("VIEW")}>
                        Switch to View Mode
                    </button>
                </div>
                <div className="wd-question-edit-mode col-3 d-flex align-items-center justify-content-center">
                    <button id="wd-question-edit-mode-button" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0"
                            onClick={() => setMode("EDIT")}>
                        Switch to Edit Mode
                    </button>
                </div>
            </div>
            <div className="wd-question-prompt-row row mb-4">
                <div className="col-3"></div>
                <div id="wd-mode-prompt"
                     className="alert alert-secondary col-6 btn-secondary mb-2 me-2 fs-4 fw-bold wfloat-start text-center">
                    You are currently in edit mode
                </div>
            </div>
            <div className="wd-question-title-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-name">
                    Question Title
                </label><br/>
                {mode == "EDIT" &&
                    <input id="wd-quiz-name" className="form-control customized-boarder w-25 col-9 align-items-center justify-content-start"
                           value={currQuestion.title}
                           onChange={(e) => setCurrQuestion({...currQuestion, title: e.target.value})}/>}
            </div>
            <div className="wd-question-points-row row mb-4">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-time-limit">
                    Points
                </label>
                {mode == "EDIT" && <input type="number" min="0" id="wd-quiz-time-limit"
                                          className="form-control customized-boarder col-3 align-items-center justify-content-start"
                                          value={currQuestion.points} style={{width: '85px'}}
                                          onChange={handlePointsChange}/>}
            </div>
            <div className="wd-question-type-row row mb-4">
                <label className="form-label col-3 text-end pt-2 fw-bold" htmlFor="wd-quiz-group">Question Type</label>
                {mode == "EDIT" &&
                    <select className="col-9 form-select form-control text-start customized-boarder custom-width w-25" id="wd-quiz-group"
                            onChange={(e) => setCurrQuestion({...currQuestion, questionType: e.target.value})}>
                        <option selected={currQuestion.questionType === "TRUE_FALSE"} value="TRUE_FALSE">True or False</option>
                        <option selected={currQuestion.questionType === "MULTIPLE_CHOICE"} value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option selected={currQuestion.questionType === "FILL_IN_BLANK"} value="FILL_IN_BLANK">Fill Blank</option>
                    </select>}
            </div>
            <div className="wd-question-text-row row mb-4">
                <label className="col-3 d-flex align-items-baseline justify-content-end fw-bold" htmlFor="wd-question-text">
                    Question Text
                </label>
                {mode == "EDIT" && <textarea id="wd-question-text"
                                             className="w-50 col-9 form-control customized-boarder justify-content-start"
                                             style={{height: '200px'}}
                                             onChange={(e) => setCurrQuestion({...currQuestion, text: e.target.value})}>
                {currQuestion.text}
                </textarea>}
            </div>
            <div className="wd-question-answer-row row">
                <label className="col-3 d-flex align-items-center justify-content-end fw-bold" htmlFor="wd-quiz-name">
                    Answers:
                </label>
            </div>
            {currQuestion.questionType == "TRUE_FALSE" && <div className="wd-question-answer-true-row row mb-1">
                <div className="col-3 d-flex align-items-center justify-content-end fw-bold"/>
                {/*{mode == "EDIT" && currQuestion.questionType == "TRUE_FALSE" && <div></div>}*/}
                <div className="col-3 align-items-center justify-content-end text-start fw-bolder fs-4">
                    <label className={currQuestion.is_correct ? "text-success bg-secondary rounded" : ""}>
                        <input
                            type="radio"
                            checked={currQuestion.is_correct}
                            onChange={() => setCurrQuestion({...currQuestion, is_correct: true})}
                        />
                        True&nbsp;
                    </label>
                </div>
            </div>}
            {currQuestion.questionType == "TRUE_FALSE" && <div className="wd-question-answer-false-row row mb-4">
                <div className="col-3 d-flex align-items-center justify-content-end fw-bold"/>
                {/*{mode == "EDIT" && currQuestion.questionType == "TRUE_FALSE" && <div></div>}*/}
                <div className="col-3 align-items-center justify-content-end text-start fw-bolder fs-4">
                    <label className={currQuestion.is_correct == false ? "text-success bg-secondary rounded" : ""}>
                        <input
                            type="radio"
                            checked={!currQuestion.is_correct}
                            onChange={() => setCurrQuestion({...currQuestion, is_correct: false})}
                        />
                        False&nbsp;
                    </label>
                </div>
            </div>}
            {currQuestion.questionType == "MULTIPLE_CHOICE" && currQuestion.options.filter((option: any) => option.deleted == false)
                .map((option: any) => (
                    <div className={`wd-question-choice-${option.number}-row row mb-4`}>
                        <div className="col-3 d-flex align-items-center justify-content-end fw-bold">
                            <label className={currQuestion.correctOptionNumber == option.number ? "text-success bg-secondary rounded" : ""}>
                                <input
                                    type="radio"
                                    checked={currQuestion.correctOptionNumber == option.number}
                                    onChange={() => setCurrQuestion({...currQuestion, correctOptionNumber: option.number})}
                                />
                                &nbsp;Mark As Correct&nbsp;
                            </label>
                        </div>
                        <label className="col-6 d-flex align-items-center justify-content-start fw-bold" htmlFor="wd-quiz-possible-answer">
                            Option:&nbsp;
                            <input id="wd-quiz-possible-answer"
                                   className="form-control customized-boarder w-100 align-items-center justify-content-start"
                                   value={currQuestion.options.find((o: any) => o.number == option.number).text || ""}
                                   onChange={(e) => handleOptionChange(e, option.number)}/>
                        </label>
                        <div className="col-2 d-flex align-items-center justify-content-start">
                            <button id="wd-save-quiz-btn" className="btn btn-sm btn-danger mb-2 me-2 mb-md-0"
                                    onClick={() => handleOptionDeleteClick(option.number)}>
                                Delete
                            </button>
                        </div>
                    </div>))}
            {currQuestion.questionType == "MULTIPLE_CHOICE" && <div className="wd-question-add-option-row row mb-4">
                <div className="col-3"/>
                <div className="col-6">
                    <button id="wd-add-option-btn" className="btn btn-lg btn-secondary mb-2 me-2 mb-md-0 float-start"
                            onClick={handleAddOptionClick}>
                        Add New Option
                    </button>
                </div>
            </div>}
            {currQuestion.questionType == "FILL_IN_BLANK" && currQuestion.correct_answers.map((answer: any, index: number) => (
                <div className={`wd-question-answer-${index}-row row mb-4`}>
                    <div className="col-3 d-flex align-items-center justify-content-end fw-bold"></div>
                    <label className="col-6 d-flex align-items-center justify-content-start fw-bold" htmlFor="wd-quiz-possible-answer">
                        Answer:&nbsp;
                        <input id="wd-question-answer"
                               className="form-control customized-boarder w-100 align-items-center justify-content-start"
                               value={currQuestion.correct_answers[index]}
                               onChange={(e) => handleAnswerChange(e, index)}/>
                    </label>
                    <div className="col-2 d-flex align-items-center justify-content-start">
                        <button id="wd-save-quiz-btn" className="btn btn-sm btn-danger mb-2 me-2 mb-md-0"
                                onClick={() => handleAnswerDeleteClick(index)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {currQuestion.questionType == "FILL_IN_BLANK" && <div className="wd-question-add-answer-row row mb-4">
                <div className="col-3"/>
                <div className="col-6">
                    <button id="wd-add-answer-btn" className="btn btn-lg btn-secondary mb-2 me-2 mb-md-0 float-start"
                            onClick={handleAddAnswerClick}>
                        Add New Answer
                    </button>
                </div>
            </div>}
            <hr/>
            <div className="wd-question-buttons-row col-7 mb-4">
                <button id="wd-save-quiz-btn" className="btn btn-lg btn-danger mb-2 me-2 mb-md-0 float-end"
                        onClick={handleUpdateClick} disabled={isDisabled}>
                    Update
                </button>
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${quizId}/Questions`}>
                    <button id="wd-cancel-quiz-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                        Cancel
                    </button>
                </a>
            </div>

        </div>
    );

}