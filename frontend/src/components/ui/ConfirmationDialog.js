import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useState} from "react";
import {ImCross} from "react-icons/im";
import '../../App.css'

function ConfirmationDialog({deleteItem, title, content}) {
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    return (
        <>
            <ImCross className="click" onClick={handleDialogOpen}/>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteItem}>Yes</Button>
                    <Button onClick={handleDialogClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmationDialog