import {BsGripVertical} from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButton";
import {MdOutlineAssignment} from "react-icons/md";
import "./index.css";
import {IoMdArrowDropdown} from "react-icons/io";
import AssignmentTitleControlButton from "./AssignmentTitleControlButton";
import AssignmentsControl from "./AssignmentsControl";
import {useParams} from "react-router";
import {deleteAssignment } from "./reducer";
import {useSelector} from "react-redux";

export default function Assignments() {
    const { cid} = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentReducer);

    return (
        <div id="wd-assignments">

            <AssignmentsControl/><br/>


            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-current-assignment list-group-item p-0 mb-5 fs-6 border-gra ">
                    <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex align-items-center">
                        <BsGripVertical className="fs-3"/>
                        <IoMdArrowDropdown className="me-2 fs-4"/>
                        <div className="flex-grow-1">CURRENT ASSIGNMENTS</div>
                        <AssignmentTitleControlButton/>
                    </div>
                    <ul className="wd-assignment-list list-group rounded-0">
                        {assignments.filter((assignment:any)=>assignment.course===cid)
                            .map((assignment:any)=> (
                                <li className="wd-assignment-list-item d-flex align-items-center list-group-item p-3 ps-1">
                                    <div className=" me-2 fs-3">
                                        <BsGripVertical/>
                                        <MdOutlineAssignment className="text-success"/>
                                    </div>
                                    <div className="flex-grow-1">
                                        <a className="wd-assignment-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                            {/*{`${assignment._id} - ${assignment.title}`}*/}
                                            {assignment.title}
                                        </a>
                                        <br/>
                                        <span className="wd-assignment-list-item-module-coverage text-danger">
                                        Multiple Modules
                                        </span>
                                        &nbsp;|&nbsp;
                                        <span className="wd-assignment-list-item-start-time">
                                        <span className="fw-bolder">Not available until </span>
                                        {assignment.availableFrom}
                                        </span>
                                        &nbsp;|&nbsp;
                                        <span className="wd-assignment-list-item-end-time">
                                        <span className="fw-bolder">Due </span>
                                        {assignment.due}
                                        </span>
                                        &nbsp;|&nbsp;
                                        <span className="wd-assignment-list-item-points">
                                        {assignment.points}pts
                                        </span>
                                    </div>
                                    <AssignmentControlButtons assignmentId={assignment._id} assignmentName={assignment.title} deleteAssignment={deleteAssignment}/>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
