import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item border-gray">
            <input className="col-7 float-start me-1" value={todo.title}
                   onChange={(e) => dispatch(setTodo({...todo, title: e.target.value}))}/>
            <button className="btn btn-warning me-1 float-end" onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"> Update
            </button>
            <button className="btn btn-success me-1 float-end" onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"> Add
            </button>
        </li>
    );
}
