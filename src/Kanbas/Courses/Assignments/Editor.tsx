export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML"/>
            <br/><br/>
            <textarea id="wd-description" cols={45} rows={10}>
        The assignment is available online
        Submit a link to the landing page of
            </textarea>
            <br/>

            <table>
                {/*points row*/}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>

                {/*assignment group row*/}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label><br/>
                    </td>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <select id="wd-group">
                            <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="QUIZZES">QUIZZES</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>

                {/*Display grade as row*/}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label><br/>
                    </td>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <select id="wd-display-grade-as">
                            <option selected value="Percentage">Percentage</option>
                            <option value="Letter Grade">Letter Grade</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>

                {/*Submission type row*/}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <select id="wd-submission-type">
                            <option selected value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>

                {/*entry options row*/}
                <tr>
                    <td/>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <label>Online Entry Options:</label>
                        <br/>
                        <input type="checkbox" name="check-entry-option" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>
                        <input type="checkbox" name="check-entry-option" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>
                        <input type="checkbox" name="check-entry-option" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                        <input type="checkbox" name="check-entry-option" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                        <input type="checkbox" name="check-entry-option" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>


                {/*Assign to row*/}
                <tr>
                    <td/>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <label htmlFor="wd-assign-to">Assign to</label><br/>
                        <input id="wd-assign-to" value={"Everyone"}/>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>

                {/*Due row*/}
                <tr>
                    <td/>
                    <td colSpan={2} align={"left"} valign={"top"}>
                        <label htmlFor="wd-due-date">Due</label><br/>
                        <input type="date" id="wd-due-date" value="2024-05-13"/>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>

                {/*Available from Util*/}
                <tr>
                    <td/>
                    <td align="left" valign="top">
                        <label htmlFor="wd-available-from">Available from</label>
                        <br/>
                        <input type="date" id="wd-available-from" value="2024-05-06"/>
                    </td>
                    <td align="left" valign="top">
                        <label htmlFor="wd-available-until">Until</label><br/>
                        <input type="date" id="wd-available-until" value="2024-05-20"/>
                    </td>
                </tr>
                <tr>
                    <td style={{height: '5px'}}></td>
                </tr>


                {/* Complete on your own */}
            </table>
        </div>
    );
}
