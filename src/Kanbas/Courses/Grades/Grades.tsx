import {FaSearch} from "react-icons/fa";
import GradesTopButton from "./GradesTopButton";
import {LuFilter} from "react-icons/lu";
import "./Grades.css";

export default function Grades() {
    return (
        <div id="wd-grades" className="container">
            <GradesTopButton/><br/><br/><br/>
            {/*search bar*/}
            <div className="row mb-4" id="wd-grades-search">
                <div className="col-6">
                    <label className="form-label text-start mb-0 pt-1 fw-bold responsive-font"
                           htmlFor="wd-student-names">
                        Student Names</label><br/>
                    <div className="input-group me-3 col mb-2 mb-md-0">
                          <span className="input-group-text bg-white border-end-0 border-2 border-black">
                            <FaSearch className="fa-sm"/>
                          </span>
                        <input type="text" id="wd-student-names" className="form-control-lg border-start-0 border-black text-start"
                               placeholder="Search..." style={{width: '70%'}}/>
                    </div>
                </div>
                <div className="col-6">
                    <label className="form-label text-start mb-0 pt-1 fw-bold responsive-font"
                           htmlFor="wd-assignment-names">
                        Assignment Names</label><br/>
                    <div className="input-group me-3 col mb-2 mb-md-0">
                          <span className="input-group-text bg-white border-end-0 border-2 border-black">
                            <FaSearch className="fa-sm"/>
                          </span>
                        <input type="text" id="wd-assignment-names"
                               className="form-control-lg border-start-0 border-black text-start"
                               placeholder="Search..." style={{width: '70%'}}/>
                    </div>
                </div>
            </div>
            {/*filter button*/}
            <button id="wd-grades-filter-button"
                    className="btn form- btn-lg btn-secondary mb-2 mb-md-0 float-start">
                <LuFilter className="me-2"/>
                Apply Filters
            </button>


            <br/><br/><br/>
            {/*grades table*/}
            <div id="wd-grades-table" className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>A1 SETUP<br/>Out of 100</th>
                        <th>A2 HTML<br/>Out of 100</th>
                        <th>A3 CSS<br/>Out of 100</th>
                        <th>A4 BOOTSTRAP<br/>Out of 100</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Jane Adams</td>
                        <td><input type="text" value="96.67%"/></td>
                        <td><input type="text" value="96.67%"/></td>
                        <td><input type="text" value="92.67%"/></td>
                        <td><input type="text" value="55.67%"/></td>
                    </tr>
                    <tr>
                        <td>Christina Allen</td>
                        <td><input type="text" value="100%"/></td>
                        <td><input type="text" value="100%"/></td>
                        <td><input type="text" value="100%"/></td>
                        <td><input type="text" value="100%"/></td>
                    </tr>
                    <tr>
                        <td>Samreen Ansari</td>
                        <td><input type="text" value="100%"/></td>
                        <td><input type="text" value="100%"/></td>
                        <td><input type="text" value="100%"/></td>
                        <td><input type="text" value="100%"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}