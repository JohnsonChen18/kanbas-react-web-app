import {useDispatch} from "react-redux";

export default function CourseEditor(
    {courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, currUserId}: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
        currUserId: string;
    }) {

    const handleAddClick = () =>{
       setCourse({...course, creator:currUserId});
       addNewCourse();
    }

    return (
        <div className="wd-course-editor">
            <h5>New Course
                <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={handleAddClick}> Add
                </button>
                <button className="btn btn-warning float-end me-2"
                        onClick={updateCourse} id="wd-update-course-click">
                    Update
                </button>
            </h5>
            <br/>
            <input value={course.name} className="form-control mb-2"
                   onChange={(e) => setCourse({...course, name: e.target.value})}/>
            <textarea value={course.description} className="form-control"
                      onChange={(e) => setCourse({...course, description: e.target.value})}/>
            <hr/>
        </div>
    );

}