import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";

function LoginPage() {
    let {loginUser} = useContext(AuthContext)
    return (
        <>
            <form onSubmit={loginUser}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Enter Password"
                />
                <input
                    type="Submit"
                />
            </form>
        </>
    );
}

export default LoginPage