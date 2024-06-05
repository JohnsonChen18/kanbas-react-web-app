import {FaSearch} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";

export default function EditorBottomButton() {
    return (
        <div id="wd-editor-buttom" className="">
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger mb-2 mb-md-0 float-end">
                Save
            </button>
            <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                Cancel
            </button>
        </div>
    );
}