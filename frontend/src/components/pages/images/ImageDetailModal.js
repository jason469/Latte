import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageDetailPage from "./ImageDetailPage";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";

export default function ImageDetailModal({open, handleClose, imageId}) {
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
                        <ImageDetailPage imageId={imageId} key={imageId} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}