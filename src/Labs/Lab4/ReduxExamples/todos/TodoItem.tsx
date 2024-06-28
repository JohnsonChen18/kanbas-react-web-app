import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({todo}: {
    todo: { id: string; title: string };
}) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item border-gray">
            <div id="todo-content" className="col-7 me-1 float-start text-truncate">{todo.title}</div>
            <button className="btn btn-danger me-1 float-end" onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"> Delete
            </button>
            <button className="btn btn-primary me-1 float-end" onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"> Edit
            </button>
        </li>
    );
}

