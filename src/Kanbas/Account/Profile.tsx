import * as client from "./client";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "./reducer";
import {updateProfile} from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    const dispatch = useDispatch();
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };
    const handleUpdateClick = async () => {
        const updatedUser = {
            ...currentUser,
            password: profile.password,
            firstName: profile.firstName,
            lastName: profile.lastName,
            dob: profile.dob,
            email: profile.email,
            role: profile.role,
        };
        dispatch(setCurrentUser(updatedUser));
        await client.updateProfile(updatedUser);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div className="wd-profile-screen">
            <h1>Profile</h1>
            {profile && (
                <div>
                    <input className="wd-username" value={profile.username}/><br/>
                    <input className="wd-password" value={profile.password} placeholder="Password"
                           onChange={(e) => setProfile({...profile, password: e.target.value})}/><br/>
                    <input className="wd-firstname" value={profile.firstName} placeholder="First Name"
                           onChange={(e) => setProfile({...profile, firstName: e.target.value})}/><br/>
                    <input className="wd-lastname" value={profile.lastName} placeholder="Last Name"
                           onChange={(e) => setProfile({...profile, lastName: e.target.value})}/><br/>
                    <input className="wd-dob" value={profile.dob} placeholder="Date of Birth"
                           onChange={(e) => setProfile({...profile, dob: e.target.value})} type="date"/><br/>
                    <input className="wd-email" value={profile.email} placeholder="Email"
                           onChange={(e) => setProfile({...profile, email: e.target.value})}/><br/>
                    <select className="wd-role" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select><br/>
                    <button onClick={handleUpdateClick} className="wd-signout-btn btn btn-primary w-25 mt-2">
                        Update
                    </button>
                    <br/>
                    <button onClick={signout} className="wd-signout-btn btn btn-danger w-25 mt-2">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
