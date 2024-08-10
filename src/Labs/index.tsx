import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import store from "./store";
import { Provider } from "react-redux";
import Lab5 from "./Lab5";
import React from "react";
import Lab6 from "./Lab6";
export default function Labs() {
    return (
        <Provider store={store}>
            <div>
                <h1>Web Dev Team 15</h1><br/>
                <h1>Name: Miaozhi Chen (Section 02)</h1><br/>
                <h1>Name: Jiarong Zhu(Section 02)</h1><br/>
                {/*<a href="https://github.com/JohnsonChen18/kanbas-react-web-app.git" target="_blank">My github</a>*/}
                <br/> <br/>
                <h1>Labs</h1>
                <TOC/>
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1"/>}/>
                    <Route path="Lab1" element={<Lab1/>}/>
                    <Route path="Lab2" element={<Lab2/>}/>
                    <Route path="Lab3/*" element={<Lab3/>}/>
                    <Route path="Lab4/*" element={<Lab4/>}/>
                    <Route path="Lab5/*" element={<Lab5/>}/>
                    <Route path="Lab6/*" element={<Lab6/>}/>
                </Routes>
            </div>
        </Provider>
    );
}
