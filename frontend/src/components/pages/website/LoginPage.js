import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {Box, Button, TextField} from "@mui/material";
import '../../../App.css'

function LoginPage() {
    let {loginUser} = useContext(AuthContext)
    return (
        <>
            <form onSubmit={loginUser}>
                <Box margin={2}>
                    <TextField
                        name="username"
                        label="Username"
                    />
                </Box>
                <Box margin={2}>
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                    />
                </Box>
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}

export default LoginPage