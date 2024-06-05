import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import {BsPlus} from "react-icons/bs";

export default function AssignmentTitleControlButton() {
    return (
        <div className="d-flex align-items-center float-end">
            <span className="badge rounded-pill bg-light text-secondary border me-2">40% of Total</span>
            <BsPlus className="fs-4"/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    );
}