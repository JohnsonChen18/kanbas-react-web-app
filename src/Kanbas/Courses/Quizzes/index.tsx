import {Route, Routes} from "react-router";
import Home from "../Home";
import Modules from "../Modules";
import Assignments from "../Assignments";
import AssignmentEditor from "../Assignments/Editor";
import Grades from "../Grades/Grades";
import PeopleTable from "../People/Table";
import QuizzesScreen from "./QuizzesScreen";
import QuizDetailScreen from "./QuizDetailScreen";
import QuizEditor from "./QuizEditor";
import QuizTaking from "./QuizTaking";
import QuizReview from "./QuizRecord/QuizReview";

export default function Quizzes(){
    return(
        <div className="wd-quizzes">
            <Routes>
                <Route path="" element={<QuizzesScreen/>} />
                <Route path=":quizId" element={<QuizDetailScreen/>} />
                <Route path="Editor/:quizId/*" element={<QuizEditor/>} />
                <Route path="Taking/:quizId/*" element={<QuizTaking/>} />
                <Route path="Review/:quizId/:quizRecordId/*" element={<QuizReview/>} />
            </Routes>
        </div>
    );
}