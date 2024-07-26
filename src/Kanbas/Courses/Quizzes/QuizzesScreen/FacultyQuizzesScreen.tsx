import {FaPlus} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {addQuiz} from "../reducer";
import * as client from "../client";

export default function FacultyQuizzesScreen() {
    const dispatch = useDispatch();
    const {cid} = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const createQuiz = async (quiz: any) => {
        const newQuiz = await client.createQuiz(quiz);
        dispatch(addQuiz(newQuiz));
        console.log(quizzes);
    };
    const handleAddButtonClick = () => {
        const currentDate = new Date();
        const quiz = {
            course:cid,
            name:"DEFAULT_QUIZ_NAME",
            availableDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // one day after
            dueDate: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000), // two day after
            untilDate: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000), // three day after
        };
        createQuiz(quiz);
    };

    return(
        <div className="wd-quiz-screen-faculty">
            <button id="wd-add-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"
                    onClick={handleAddButtonClick}>
                <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                Quiz
            </button>
            <button id="wd-add-quiz-btn" className="float-end btn btn-lg btn-danger mb-2 mb-md-0"
                    onClick={()=>console.log(quizzes)}>
                <FaPlus className="position-relative me-2" style={{bottom: '1px'}}/>
                show quiz log
            </button>



        </div>
    );
}