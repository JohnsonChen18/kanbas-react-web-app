import "./index.css";
import {useLocation, useParams} from "react-router";
export default function CoursesNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];
    const { pathname } = useLocation();
    // const courseId = pathname.split("/")[3];
    const { cid } = useParams();

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
        {links.map((link) => (
            <a id={`wd-course-${link.toLowerCase()}-link`}
               href={`#/Kanbas/Courses/${cid}/${link}`}
               className={`list-group-item border border-0 ${pathname.includes(link) ? 'active' : 'text-danger'}`}>
                {link} </a>
        ))}
        </div>
    );
}
