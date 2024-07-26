import {FaPlus} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setCurrentUser} from "../Account/reducer";
import * as client from "./client";
export default function CourseRegistrar({allCourses}: {
    allCourses: any[];
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const [enrolledCourseIdArr, setEnrolledCourseIdArr] = useState<any[]>(currentUser.enrolledCourses);
    const handleEnroll = (courseId:any) =>{
        if (!enrolledCourseIdArr.includes(courseId)) {
            setEnrolledCourseIdArr([...enrolledCourseIdArr, courseId]);
        }
        // console.log("enroll function is called");
        // console.log(enrolledCourseIdArr);
    };
    const handleNotEnroll = (courseId:any)=>{
        setEnrolledCourseIdArr(enrolledCourseIdArr.filter(id => id !== courseId));
        // console.log("not enroll function is called");
        // console.log(enrolledCourseIdArr);
    };
    const handleConfirmClick = async ()=>{
        const updatedUser = { ...currentUser, enrolledCourses: enrolledCourseIdArr };
        dispatch(setCurrentUser(updatedUser));
        const status = await client.updateEnrolledCourses(updatedUser);
    }

    useEffect(() => {
        const handleModalShow = () => {
            setEnrolledCourseIdArr(currentUser.enrolledCourses || []);
        };

        const modalElement = document.getElementById('wd-enroll-course-dialog');
        modalElement?.addEventListener('show.bs.modal', handleModalShow);

        return () => {
            modalElement?.removeEventListener('show.bs.modal', handleModalShow);
        };
    }, [currentUser]);
    return(
        <div className="CourseRegistrar">
            <button
                id="wd-enroll-course-btn"
                className="btn btn-lg btn-danger me-1 float-start"
                data-bs-toggle="modal"
                data-bs-target="#wd-enroll-course-dialog">
                Course Registrar
            </button>
            <div id="wd-enroll-course-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Course Registrar </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h5 className="text-danger">All Available Courses:</h5>
                            {/*<button onClick={() => console.log(enrolledCourseIdArr)}>log*/}
                            {/*    enrolledCourseIdArr*/}
                            {/*</button>*/}
                            {/*<button onClick={() => console.log(currentUser)}>log*/}
                            {/*    currentUser*/}
                            {/*</button>*/}
                            {allCourses.map((course) => (
                                <div>
                                    <h6><b>{course.name}</b></h6>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`enroll-${course._id}`}
                                            value="enroll"
                                            checked={enrolledCourseIdArr.includes(course._id)}
                                            onChange={() => handleEnroll(course._id)}
                                        />
                                        Enroll
                                    </label>
                                    &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name={`enroll-${course._id}`}
                                            value="notEnroll"
                                            checked={!enrolledCourseIdArr.includes(course._id)}
                                            onChange={() => handleNotEnroll(course._id)}
                                        />
                                        Not Enroll
                                    </label>
                                    <br/>
                                    <br/>
                                </div>

                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleConfirmClick}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}