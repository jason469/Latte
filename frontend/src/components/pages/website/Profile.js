import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";

function Profile() {
    let {user} = useContext(AuthContext)

    return (
        <h1>Hi {user.first_name} {user.last_name}</h1>
    );
}

export default Profile;
