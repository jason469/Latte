import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {Alert, Box, Button, TextField} from "@mui/material";
import '../../../App.css'
import SendIcon from "@mui/icons-material/Send";

function LoginPage() {
    let {loginUser, validUser} = useContext(AuthContext)
    return (
        <>
            {validUser===false &&
                <Alert variant="outlined" severity="error">
                    Invalid user :(
                </Alert>
            }
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
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                >
                    Submit
                </Button>
            </form>
        </>
    );
}

export default LoginPage