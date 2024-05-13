import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <hr/>
            <table>
                <tr>
                    <td valign="top">
                        <CoursesNavigation/>
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="Home" element={<Home />}/>
                            <Route path="Modules" element={<Modules />}/>
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:id" element={<AssignmentEditor />} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}
