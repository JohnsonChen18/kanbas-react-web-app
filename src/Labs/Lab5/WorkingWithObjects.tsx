import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module",
        description: "This is a nodejs module",
        course:"RS101",
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                   value={assignment.title} onChange={(e) =>
                setAssignment({...assignment, title: e.target.value})}/>
            <br/>

            <a id="wd-update-assignment-score"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Assignment Score
            </a>
            <input className="form-control w-75" id="wd-assignment-score" type="number"
                   value={assignment.score} onChange={(e) =>
                setAssignment({...assignment, score: Number(e.target.value)})}/>
            <br/>

            <a id="wd-update-assignment-completed"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Assignment Completed
            </a>
            Is assignment completed ?
            <input className="form-check-input ms-2" id="wd-assignment-completed-true" type="checkbox"
                   checked={assignment.completed} onChange={(e) =>
                setAssignment({...assignment, completed: true})}/>
            <label className="form-check-label me-2" htmlFor="wd-assignment-completed-true">
                True
            </label>
            <input className="form-check-input " id="wd-assignment-completed-false" type="checkbox"
                   checked={!assignment.completed} onChange={(e) =>
                setAssignment({...assignment, completed: false})}/>
            <label className="form-check-label" htmlFor="wd-assignment-completed-false">
                False
            </label>

            <br/>
            <br/>

            <a id="wd-update-module-name"
               className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/Name/${module.name}`}>
                Update Module Name
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                   value={module.name} onChange={(e) =>
                setModule({...module, name: e.target.value})}/>
            <br/>

            <a id="wd-update-module-description"
               className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Module Description
            </a>
            <input className="form-control w-75" id="wd-assignment-description"
                   value={module.description} onChange={(e) =>
                setModule({...module, description: e.target.value})}/>
            <br/>


            <hr/>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
               href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <a id="wd-retrieve-module" className="btn btn-primary me-2"
               href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr/>
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <hr/>
        </div>
    );
}
