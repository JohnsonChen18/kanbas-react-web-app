import "./Editor.css";
import EditorBottomButton from "./EditorBottomButton";
import {useParams} from "react-router";
import * as db from "../../Database";
import assignments from "../../Database/assignments.json";

export default function AssignmentEditor() {
    const { cid} = useParams();
    const { aid} = useParams();
    const assignment = assignments.find((a)=> a._id===aid);
    return (
        <div id="wd-assignments-editor" className="container col-12 col-md-10 col-xl-8 col-xxl-6">
            <label htmlFor="wd-name">Assignment Name</label><br/>
            <input id="wd-name" className="form-control customized-boarder text-start"
                   value={assignment && assignment.title ? `${assignment.title}` : ""}/>
            <br/>
            <textarea id="wd-description" className="form-control customized-boarder">
            {assignment && assignment.description ? `${assignment.description}` : ""}
            </textarea>
            <br/>

            {/*table*/}
            <div className="d-grid">
                {/*points*/}
                <div className="row mb-2">
                    <label className="form-label col-3 text-end pt-2" htmlFor="wd-points">Points</label>
                    <input className="col-9 form-control text-start customized-boarder custom-width"
                           id="wd-points" value={assignment && assignment.points ? `${assignment.points}` : ""}/>
                </div>
                {/*assignment group*/}
                <div className="row mb-2">
                    <label className="form-label col-3 text-end pt-2" htmlFor="wd-group">Assignment Group</label>
                    <select className="col-9 form-select form-control text-start customized-boarder custom-width"
                            id="wd-group">
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="PROJECT">PROJECT</option>
                    </select>
                </div>
                {/*display grade as*/}
                <div className="row mb-2">
                    <label className="form-label col-3 text-end pt-2" htmlFor="wd-display-grade-as">Display Grade
                        as</label>
                    <select className="col-9 form-control form-select text-start customized-boarder custom-width"
                            id="wd-display-grade-as">
                        <option selected value="Percentage">Percentage</option>
                        <option value="Letter Grade">Letter Grade</option>
                    </select>
                </div>
                {/*submission type*/}
                <div id="wd-assignments-editor-submission-type" className="row mb-2">
                    <label className="form-label col-3 text-end pt-3" htmlFor="wd-submission-type">Submission
                        Type</label>
                    <div className="card col-9 customized-boarder custom-width">
                        <select className="form-select form-control text-start customized-boarder mt-2"
                                id="wd-submission-type">
                            <option selected value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                        <div id="wd-assignments-editor-submission-type-options" className="card-body">
                            <label className="ms-0 mb-2 fw-bold">Online Entry Options:</label> <br/>
                            <div className="d-flex">
                                <input type="checkbox" className="form-control form-check-input"
                                       name="check-entry-option" id="wd-text-entry"/>
                                <label htmlFor="wd-text-entry">Text Entry</label><br/>
                            </div>
                            <div className="d-flex">
                                <input type="checkbox" className="form-control form-check-input"
                                       name="check-entry-option"
                                       id="wd-website-url"/>
                                <label htmlFor="wd-website-url">Website URL</label><br/>
                            </div>
                            <div className="d-flex">
                                <input type="checkbox" className="form-control form-check-input"
                                       name="check-entry-option" id="wd-media-recordings"/>
                                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                            </div>
                            <div className="d-flex">
                                <input type="checkbox" className="form-control form-check-input"
                                       name="check-entry-option" id="wd-student-annotation"/>
                                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                            </div>
                            <div className="d-flex">
                                <input type="checkbox" className="form-control form-check-input"
                                       name="check-entry-option" id="wd-file-upload"/>
                                <label htmlFor="wd-file-upload">File Uploads</label>
                            </div>
                        </div>
                    </div>
                </div>
                {/*assign to*/}
                <div className="row mt-2 mb-2">
                    <label className="form-label col-3 text-end pt-1" htmlFor="wd-assign-to">Assign to</label>
                    <div className="card col-9 customized-boarder custom-width">
                        {/*assign to*/}
                        <label className="form-label col-4 text-start fw-bold mt-2 mb-0" htmlFor="wd-assign-to"
                               data-role="tagsinput">Assign
                            to</label>
                        <input className="customized-boarder form-control text-start" id="wd-assign-to" value={"Everyone"}/>
                        {/*due*/}
                        <label className="form-label col-4 text-start fw-bold mt-2 mb-0"
                               htmlFor="wd-due-date">Due</label>
                        <input className="customized-boarder form-control text-start" type="datetime-local" id="wd-due-date"
                               value={assignment && assignment.due ? `${assignment.due}` : ""}/>
                        {/*available from until*/}
                        <div className="row mt-2 mb-2">
                            <div className="col-6">
                                <label className="form-label text-start mb-0 pt-1 fw-bold" htmlFor="wd-available-from">
                                    Available from</label><br/>
                                <input className="form-control customized-boarder text-start form-control" type="datetime-local"
                                       id="wd-available-from"
                                       value={assignment && assignment.availableFrom ? `${assignment.availableFrom}` : ""}/>
                            </div>
                            <div className="col-6">
                                <label className="form-label text-start mb-0 pt-1 fw-bold" htmlFor="wd-available-until">
                                    Until</label><br/>
                                <input className="form-control customized-boarder text-start form-control " type="datetime-local"
                                       id="wd-available-until"
                                       value={assignment && assignment.availableUntil ? `${assignment.availableUntil}` : ""}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4 col-12 my-0"/>
            <EditorBottomButton/><br/><br/><br/><br/>
        </div>
    );
}
