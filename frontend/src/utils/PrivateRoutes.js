import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";

const PrivateRoutes = () => {
    let {user} = useContext(AuthContext)
    const location = useLocation();
    let authenticated = null

    user ? authenticated = true : authenticated = false

    return authenticated
        ? <Outlet/>
        : <Navigate to="/login" replace state={{from: location}}/>;
}

export default PrivateRoutes