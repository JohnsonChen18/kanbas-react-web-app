import React, { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="btn btn-success ms-2 mb-3" onClick={addElement}>Add Element</button>
            <ul className="list-group col-12 col-md-8 col-lg-6 col-xl-3 ps-2">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center border-gray">
                        {item}
                        <button className="btn btn-danger"  onClick={() => deleteElement(index)}
                                id="wd-delete-element-click">
                            Delete</button>
                    </li>
                ))}
            </ul>
            <hr/>
        </div>
    );
}
