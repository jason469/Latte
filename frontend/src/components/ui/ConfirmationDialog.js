import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {useState, forwardRef} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import {DialogStyle} from "../../utils/ModalBoxStyles";
import '../../App.css'
import classes from "./ConfirmationDialog.module.css"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

function ConfirmationDialog({deleteItem, title, content}) {
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    return (
        <div>
            <CancelIcon className={`${classes.cross}`} onClick={handleDialogOpen} size={10}/>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
                sx={DialogStyle}
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
        </div>
    )
}

export default ConfirmationDialog