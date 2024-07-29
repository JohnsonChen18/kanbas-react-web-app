import {useDispatch, useSelector} from "react-redux";
import FacultyQuizzesScreen from "./FacultyQuizzesScreen";
import {useEffect} from "react";
import {setQuizzes} from "../reducer";
import * as client from "../client";
import {useParams} from "react-router";
import StudentQuizzesScreen from "./StudentQuizzesScreen";


export default function QuizzesScreen() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const {cid} = useParams();
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesByCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    }
    useEffect(() => {
        fetchQuizzes();
    }, []);

    return(
        <div className="wd-quizzes-screen">
            {currentUser.role === "FACULTY" && <FacultyQuizzesScreen/>}
            {currentUser.role === "STUDENT" && <StudentQuizzesScreen/>}
        </div>
    );
}