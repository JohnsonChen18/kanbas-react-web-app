import {FaCheckCircle, FaCircle, FaFileExport, FaFileImport} from "react-icons/fa";
import {FaGear} from "react-icons/fa6";

export default function GradesTopButton() {
    return (
        <div id="wd-grades-top-buttons">
            <button id="wd-grades-top-buttons-setting-button"
                    className="btn btn-lg btn-secondary mb-2 mb-md-0 float-end">
                <FaGear />
            </button>
            <button id="wd-add-group-btn" className="btn dropdown-toggle btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                <FaFileExport className="me-2" />
                <span className="me-2">Export</span>
            </button>
            <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-2 mb-2 mb-md-0 float-end">
                <FaFileImport className="me-2" />
                Import
            </button>
        </div>
    );
}