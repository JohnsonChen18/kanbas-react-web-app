import {Link} from "react-router-dom";
import React from 'react';

export default function StudentDashboard(
    {courses, setCourse, deleteCourse, student}: {
        courses: any[];
        setCourse: (course: any) => void;
        deleteCourse: (course: any) => void;
        student: any;
    }){
    const courseIdArray = student.enrolledCourses;
    const currentCourse = courses.filter((course)=> courseIdArray.includes(course._id));
    return (
        <div id="wd-dashboard-courses-student" className="row">
            <h2 id="wd-dashboard-published">Published Courses ({currentCourse.length})</h2>
            <hr/>
            <div className="row row-cols-1 row-cols-md-5 gx-4">
                {currentCourse.map((course) => (
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                            <div className="card rounded-3 overflow-hidden">
                                <img src={`/images/${course.imgName}`} height="{160}"/>
                                <div className="card-body">
                                    <span className="wd-dashboard-course-link"
                                          style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                      {course.name}
                                    </span>
                                    <p className="wd-dashboard-course-title card-text"
                                       style={{maxHeight: 53, overflow: "hidden"}}>
                                        {course.description}
                                    </p>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                          className="btn btn-primary">Go</Link>
                                    {/*<button onClick={(event) => {*/}
                                    {/*    event.preventDefault();*/}
                                    {/*    deleteCourse(course._id);*/}
                                    {/*}} className="btn btn-danger float-end"*/}
                                    {/*        id="wd-delete-course-click">*/}
                                    {/*    Delete*/}
                                    {/*</button>*/}
                                    {/*<button id="wd-edit-course-click"*/}
                                    {/*        onClick={(event) => {*/}
                                    {/*            event.preventDefault();*/}
                                    {/*            setCourse(course);*/}
                                    {/*        }}*/}
                                    {/*        className="btn btn-warning me-2 float-end">*/}
                                    {/*    Edit*/}
                                    {/*</button>*/}

                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}