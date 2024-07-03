import {Route, Routes, useLocation, useParams} from "react-router";
import {Link} from "react-router-dom";
import {useState} from "react";
function Abc() {
    const [x, h] = useState(true);
    return (
        <div>
            <button onClick={() => { h(!x); }}>R</button>
            <input type="checkbox" checked={x} onChange={() => h(!x)} id="s" />
            <label htmlFor="s">Q</label>
            {x && <h1>P</h1>}
            {!x && <h1>K</h1>}
        </div>
    );
}

export default function Lab6() {
    return (
        <div id="wd-lab6">
            <Abc/>
        </div>
    );
}