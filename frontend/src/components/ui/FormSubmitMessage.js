import {Alert, Snackbar} from "@mui/material";
import '../../App.css'

function FormSubmitMessage({formOutcome,
                               item=null,
                               setFormOutcome=null}) {
    return (
        <>
            {formOutcome === 'updated' && (
                <Snackbar
                    open={formOutcome}
                    autoHideDuration={5000}
                    message="Updated"
                    onClose={() => setFormOutcome(null)}
                />
            )}
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