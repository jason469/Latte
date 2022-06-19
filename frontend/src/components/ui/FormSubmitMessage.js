import {Alert} from "@mui/material";

function FormSubmitMessage({successStatus, item}) {
    return (
        <>
            {successStatus === true && (
                <Alert variant="outlined" severity="success">
                    {item} has been successfully added!
                </Alert>
            )}
            {successStatus === false && (
                <Alert variant="outlined" severity="error">
                    Unable to add {item}
                </Alert>
            )}
        </>
    )
}

export default FormSubmitMessage