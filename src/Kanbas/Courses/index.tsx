import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import {Route, Routes, useParams,useLocation} from "react-router";
import AssignmentEditor from "./Assignments/Editor";
import {FaAlignJustify} from "react-icons/fa";
import Grades from "./Grades/Grades";
import PeopleTable from "./People/Table";
import PeopleDetails from "./People/Details";
import QuizzesScreen from "./Quizzes/QuizzesScreen";
import QuizDetailScreen from "./Quizzes/QuizDetailScreen";
import QuizEditor from "./Quizzes/QuizEditor";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    return (
        <div id="wd-courses">
            <h2 className="text-danger"><FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}</h2>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation/>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home/>}/>
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
                        <Route path="Grades" element={<Grades />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="People/:uid" element={<PeopleTable />} />
                        <Route path="Quizzes" element={<QuizzesScreen/>} />
                        <Route path="Quizzes/:quizId" element={<QuizDetailScreen/>} />
                        <Route path="Quizzes/Editor/:quizId/*" element={<QuizEditor/>} />
                        <Route path="Quizzes/Preview/:quizId/*" element={<QuizEditor/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
