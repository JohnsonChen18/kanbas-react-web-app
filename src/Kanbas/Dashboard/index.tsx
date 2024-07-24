import "./index.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import CourseEditor from "./CourseEditor";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";
import CourseRegistrar from "./CourseRegistrar";

export default function Dashboard(
    {courses, course, setCourse, addNewCourse, deleteCourse, updateCourse}: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>

            {/*course editor*/}
            {currentUser.role === "FACULTY" &&
                <CourseEditor course={course} setCourse={setCourse} courses={courses} addNewCourse={addNewCourse}
                              deleteCourse={deleteCourse} updateCourse={updateCourse} currUserId={currentUser._id}/>}
            {currentUser.role === "STUDENT" && <div><CourseRegistrar allCourses={courses}/><br/><br/><br/></div>}
            {currentUser.role === "FACULTY" &&
                <FacultyDashboard courses={courses} setCourse={setCourse} deleteCourse={deleteCourse}
                                  creator={currentUser._id}/>}
            {currentUser.role === "STUDENT" &&
                <StudentDashboard courses={courses} setCourse={setCourse} deleteCourse={deleteCourse}
                                  student={currentUser}/>}


            {/*<h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>*/}
            {/*<hr/>*/}
            {/*<div id="wd-dashboard-courses" className="row">*/}
            {/*    <div className="row row-cols-1 row-cols-md-5 gx-4">*/}
            {/*        {courses.map((course) => (*/}
            {/*            <div className="wd-dashboard-course col" style={{width: "300px"}}>*/}
            {/*                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">*/}
            {/*                    <div className="card rounded-3 overflow-hidden">*/}
            {/*                        <img src={`/images/${course.imgName}`} height="{160}"/>*/}
            {/*                        <div className="card-body">*/}
            {/*                        <span className="wd-dashboard-course-link"*/}
            {/*                              style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>*/}
            {/*                          {course.name}*/}
            {/*                        </span>*/}
            {/*                            <p className="wd-dashboard-course-title card-text"*/}
            {/*                               style={{maxHeight: 53, overflow: "hidden"}}>*/}
            {/*                                {course.description}*/}
            {/*                            </p>*/}
            {/*                            <Link to={`/Kanbas/Courses/${course._id}/Home`}*/}
            {/*                                  className="btn btn-primary">Go</Link>*/}
            {/*                            <button onClick={(event) => {*/}
            {/*                                event.preventDefault();*/}
            {/*                                deleteCourse(course._id);*/}
            {/*                            }} className="btn btn-danger float-end"*/}
            {/*                                    id="wd-delete-course-click">*/}
            {/*                                Delete*/}
            {/*                            </button>*/}
            {/*                            <button id="wd-edit-course-click"*/}
            {/*                                    onClick={(event) => {*/}
            {/*                                        event.preventDefault();*/}
            {/*                                        setCourse(course);*/}
            {/*                                    }}*/}
            {/*                                    className="btn btn-warning me-2 float-end">*/}
            {/*                                Edit*/}
            {/*                            </button>*/}

            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
