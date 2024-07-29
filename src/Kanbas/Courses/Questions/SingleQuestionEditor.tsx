import {useParams} from "react-router";
import React, {useEffect, useReducer, useState} from "react";
import {useSelector} from "react-redux";

export default function SingleQuestionEditor() {
    const {cid, quizId, questionNumber } = useParams();
    const {questions} = useSelector((state: any) => state.questionReducer);
    const [currQuestion  , setCurrQuestion] = useState<any|any>();
    const [mode, setMode] = useState("EDIT");
    const handlePointsChange = (e:any) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0) {
            setCurrQuestion({ ...currQuestion, points: value });
        } else {
            setCurrQuestion({ ...currQuestion, points: 0 });
        }
    };
    useEffect(() => {
        const question = questions.find((q:any)=>(q.number == questionNumber));
        setCurrQuestion(question);
    }, []);

    if (!currQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wd-questions-single-question-editor d-grid">
            <div className="col-4 d-flex justify-content-center align-items-center">
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${quizId}/Questions`}>
                    <button id="wd-cancel-quiz-btn" className="btn btn-sm btn-secondary mb-2 text-center">
                        Back to Questions
                    </button>
                </a>
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
            <div className="wd-question-answer-true-row row mb-4">
                <div className="col-3 d-flex align-items-center justify-content-end fw-bold"/>
                {/*{mode == "EDIT" && currQuestion.questionType == "TRUE_FALSE" && <div></div>}*/}
                <div className="col-3 align-items-center justify-content-end text-start fw-bolder">
                    <label>
                        <input
                            type="radio"
                            value="true"
                            checked={currQuestion.is_correct}
                            onChange={() => setCurrQuestion({...currQuestion, is_correct: true})}
                        />
                        True
                    </label>
                </div>
            </div>

        </div>
    );

}