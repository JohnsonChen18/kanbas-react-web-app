import {FaSearch} from "react-icons/fa";
import GradesTopButton from "./GradesTopButton";
import {LuFilter} from "react-icons/lu";
import "./Grades.css";
import * as db from "../../Database";
import {useParams} from "react-router";

export default function Grades() {
    const{cid} = useParams();
    const{aid} = useParams();
    const assignments = db.assignments.filter((assignment)=> assignment.course === cid);
    const enrolledIDs = db.enrollments
        .filter((enrollment)=> enrollment.course === cid)
        .map((enrollment)=> enrollment.user);
    const students = db.users.filter((user)=>user.role === "STUDENT");
    const grades = db.grades;

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
                        {assignments.map((assignment)=> (
                            <th>{assignment.title}<br/>{`Out of ${assignment.points}`}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {enrolledIDs.map((enrolledID)=> {
                        let student = students.find((student)=>student._id===enrolledID);
                        let studentID = student&&student._id? student._id : '';
                        if (student === undefined) {
                            return null;
                        }
                        return (
                            <tr>
                                <td>{student ? `${student.firstName} ${student.lastName}` : 'NOT FOUND'}</td>
                                {assignments.map((assignment) =>{
                                    let gradeObj = grades.find((grade)=>grade.assignment===assignment._id && grade.student === studentID);
                                    return (
                                        <td><input type="text" value={`${gradeObj? gradeObj.grade : 'N/A'}`}/></td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}