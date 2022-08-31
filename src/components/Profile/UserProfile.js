import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.css";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const UserProfile = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
    <section className="profile">
        <h1>Your User Profile</h1>
        <ProfileForm />
        {isLoggedIn && (
            <li>
                <button className="logout-btn" onClick={logoutHandler}>Logout</button>
            </li>
        )}
       </section>
    );
};

export default UserProfile;
