import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import "./ProfileForm.css";
import {TextField, Button} from "@mui/material";

const ProfileForm = () => {
  const history = useNavigate();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      history('/');
    });
  };

  return (
    <form className="user-form" onSubmit={submitHandler}>
      <div className="control">
        <label htmlFor="new-password" className="title-label">New Password</label>
        <TextField
            type="password"
            id="new-password"
            minLength="7"
            ref={newPasswordInputRef}
            label="Change password"
            variant="outlined"
            size="small"
        />
      </div>
      <div className="action">
        <Button variant="contained">Change</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
