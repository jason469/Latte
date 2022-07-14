import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import '../../../App.css'

function Profile() {
    let {user} = useContext(AuthContext)
    console.log(user)

    return (
        <h1>Hi {user.first_name} {user.last_name}</h1>
    );
}

export default Profile;
