import {FaSearch} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";
import {useParams} from "react-router";

export default function EditorBottomButton() {
    const{ cid} = useParams();
    return (
        <div id="wd-editor-buttom" className="">
            <a href={`#/Kanbas/Courses/${cid}/Assignments`}>
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger mb-2 mb-md-0 float-end">
                    Save
                </button>
            </a>
            <a href={`#/Kanbas/Courses/${cid}/Assignments`}>
                <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                    Cancel
                </button>
            </a>
        </div>
    );
}