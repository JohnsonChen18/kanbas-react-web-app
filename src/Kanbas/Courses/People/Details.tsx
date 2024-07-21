import React, {useEffect, useState} from "react";
import {IoCloseSharp} from "react-icons/io5";
import {useParams, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import * as client from "./client";
import {FaPencil} from "react-icons/fa6";
import {FaCheck, FaUserCircle} from "react-icons/fa";

export default function PeopleDetails({fetchUsers}:
                                          { fetchUsers: () => void; }) {
    const navigate = useNavigate();
    const {uid, cid} = useParams();
    const [user, setUser] = useState<any>({});
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
        setRole(user.role)
    };

    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People`);
    };

    // for editing name
    const [name, setName] = useState("");
    const [editingName, setEditingName] = useState(false);
    const saveUserName = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = {...user, firstName, lastName};
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingName(false);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People/`);
    };

    // for editing email
    const [email, setEmail] = useState("");
    const [editingEmail, setEditingEmail] = useState(false);
    const saveUserEmail = async () => {
        const updatedUser = {...user, email: email};
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingEmail(false);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People/${user._id}`);
    };

    // for editing role
    const [role, setRole] = useState("");
    const [editingRole, setEditingRole] = useState(false);
    const saveUserRole = async () => {
        const updatedUser = {...user, role: role};
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingRole(false);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People/${user._id}`);
    };

    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <Link to={`/Kanbas/Courses/${cid}/People`} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1"/> </Link>
            <div className="text-center mt-2"><FaUserCircle className="text-secondary me-2 fs-1"/></div>
            <hr/>

            {/*name*/}
            <div className="text-danger fs-4">
                {!editingName && (
                    <FaPencil onClick={() => setEditingName(true)}
                              className="float-end fs-5 mt-2 wd-edit"/>)}
                {editingName && (
                    <FaCheck onClick={() => saveUserName()}
                             className="float-end fs-5 mt-2 me-2 wd-save"/>)}
                {!editingName && (
                    <div className="wd-name"
                         onClick={() => setEditingName(true)}>
                        {user.firstName} {user.lastName}</div>)}
                {user && editingName && (
                    <input className="form-control w-50 wd-edit-name"
                           defaultValue={`${user.firstName} ${user.lastName}`}
                           onChange={(e) => setName(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   saveUserName();
                               }
                           }}
                    />
                )}
            </div>
            <br/>

            {/*email*/}
            <form>
                <div>
                    {!editingEmail && (
                        <FaPencil onClick={() => setEditingEmail(true)}
                                  className="float-end fs-6 mt-2 wd-edit"/>)}
                    {editingEmail && (
                        <FaCheck onClick={() => saveUserEmail()}
                                 className="float-end fs-6 mt-2 me-2 wd-save"/>)}
                    {!editingEmail && (
                        <div className="wd-email"
                             onClick={() => setEditingEmail(true)}>
                            <b>Email:</b> {user.email}</div>)}
                    {user && editingEmail && (
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" className="form-control w-50 wd-edit-email"
                                   defaultValue={`${user.email}`}
                                   onChange={(e) => setEmail(e.target.value)}
                                   onKeyDown={(e) => {
                                       if (e.key === "Enter") {
                                           saveUserEmail();
                                       }
                                   }} required
                            />
                        </div>
                    )}
                </div>
            </form>

            {/*roles*/}
            <div>
                {!editingRole && (
                    <FaPencil onClick={() => setEditingRole(true)}
                              className="float-end fs-6 mt-2 wd-edit"/>)}
                {editingRole && (
                    <FaCheck onClick={() => saveUserRole()}
                             className="float-end fs-6 mt-2 me-2 wd-save"/>)}
                {!editingRole && (
                    <div className="wd-email"
                         onClick={() => setEditingRole(true)}>
                        <b>Role:</b> {user.role}</div>)}
                {user && editingRole && (
                    <div>
                        <b>Role:</b><br/>
                        <select value={role} onChange={(e) => setRole(e.target.value)}
                                className="form-select float-start w-50 wd-select-role">
                            <option value="STUDENT">Students</option>
                            <option value="TA">Assistants</option>
                            <option value="FACULTY">Faculty</option>
                        </select><br/><br/>
                    </div>
                )}
            </div>
            <b>Login ID:</b> <span className="wd-login-id">      {user.loginId}      </span> <br/>
            <b>Section:</b> <span className="wd-section">       {user.section}      </span> <br/>
            <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
            <hr/>
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete"> Delete
            </button>
            <button onClick={() => navigate(`/Kanbas/Courses/${cid}/People`)}
                    className="btn btn-secondary float-start float-end me-2 wd-cancel"> Cancel
            </button>
        </div>
    );
}