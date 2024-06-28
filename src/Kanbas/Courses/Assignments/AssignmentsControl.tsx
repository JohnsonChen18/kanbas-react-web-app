import {FaPlus} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import {useParams} from "react-router";

export default function AssignmentsControl() {
    const {cid} = useParams()
    return (
        <div id="wd-modules-controls" className="d-flex flex-wrap align-items-center">
            <div className="input-group me-3 col mb-2 mb-md-0">
                  <span className="input-group-text bg-white border-end-0 border-2 border-black">
                    <FaSearch/>
                  </span>
                <input type="text" className="form-control-sm border-start-0 border-black text-start" placeholder="Search..." style={{width: '125px'}}/>
            </div>

            <div className="d-flex flex-row ml-auto">
                <button id="wd-add-group-btn" className="btn btn-sm btn-secondary me-2 mb-2 mb-md-0">
                    <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                    Group
                </button>

                {/*<button id="wd-add-assignment-btn" className="btn btn-sm btn-danger mb-2 mb-md-0" href={`#/Kanbas/Courses/${cid}/Assignments/new`}>*/}
                {/*    <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>*/}
                {/*    Assignment*/}
                {/*</button>*/}
                <a id="wd-add-assignment-btn" className="btn btn-sm btn-danger mb-2 mb-md-0"
                   href={`#/Kanbas/Courses/${cid}/Assignments/new`}>
                    <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                    Assignment
                </a>
            </div>
        </div>
    );
}