import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import {FaTrash} from "react-icons/fa";
import DeleteAssignmentDialog from "./DeleteAssignmentDialog";
export default function AssignmentControlButtons({assignmentId, assignmentName, deleteAssignment}:
     {
         assignmentId: string;
         assignmentName: string;
         deleteAssignment: (name: string) => void;
     }) {

    return (
        <div className="d-flex align-items-center float-end">
            <button id="wd-assignment-delete-btn" className="btn p-0"
                    data-bs-toggle="modal"
                    data-bs-target= {`#wd-delete-assignment-dialog-${assignmentId}`}>
                <FaTrash className="text-danger me-2"/>
            </button>
            {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>*/}
            <GreenCheckmark/>
            <IoEllipsisVertical className="fs-4"/>
            <DeleteAssignmentDialog assignmentId={assignmentId} deleteAssignment={deleteAssignment} assignmentName={assignmentName} />
        </div>
    );
}