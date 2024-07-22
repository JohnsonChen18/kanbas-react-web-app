import React, {useState, useEffect} from "react";
import * as client from "./client";
import PeopleDetails from "./Details";
import {useParams} from "react-router";
import {FaPlus} from "react-icons/fa6";

export default function PeopleTable() {
    const {cid} = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const createUser = async () => {
        const user = await client.createUser({
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            section: "S101",
            role: "STUDENT",
            email:"DEFAULT@DEFAULT.COM"
        });
        setUsers([...users, user]);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const showDetail = (uid:any) => {
        const currUrl = `#/Kanbas/Courses/${cid}/People`;
        const newUrl = `${currUrl}/${uid}`;
        window.location.href = `${newUrl}`;
    };
    return (
        <div id="wd-people-table">
            <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
                <FaPlus className="me-2"/>
                People
            </button>
            <input onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
                   className="form-control float-start w-25 me-2 wd-filter-by-name"/>
            <select value={role} onChange={(e) => filterUsersByRole(e.target.value)}
                    className="form-select float-start w-25 wd-select-role">
                <option value="">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
            </select>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: any) => (
                    <tr key={user._id}>
                        <td className="wd-full-name text-nowrap">
                            <a href={`#/Kanbas/Courses/${cid}/People/${user._id}`}>
                                <span className="wd-first-name">{user.firstName}</span>
                                &nbsp;
                                <span className="wd-last-name">{user.lastName}</span>
                            </a>
                        </td>
                        <td className="wd-login-id">{user.loginId}</td>
                        <td className="wd-section">{user.section}</td>
                        <td className="wd-role">{user.role}</td>
                        <td className="wd-last-activity">{user.lastActivity}</td>
                        <td className="wd-total-activity">{user.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <PeopleDetails fetchUsers={fetchUsers}/>
        </div>
    );
}