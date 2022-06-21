import {Alert} from "@mui/material";

function FormSubmitMessage({formOutcome, item}) {
    return (
        <>
            {formOutcome === 'created' && (
                <Alert variant="outlined" severity="success">
                    {item} has been successfully added!
                </Alert>
            )}
            {formOutcome === 'already created' && (
                <Alert variant="outlined" severity="info">
                    {item} has already been created!
                </Alert>
            )}
            {formOutcome === 'cannot be created' && (
                <Alert variant="outlined" severity="error">
                    Unable to add {item}
                </Alert>
            )}
        </>
    )
}

export default FormSubmitMessage