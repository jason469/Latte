import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TagDetailPage from "./TagDetailPage";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";

export default function TagDetailModal({open, handleClose, tagId}) {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={ModalBoxStyle}>
                        <TagDetailPage tagId={tagId} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}