import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageDetailPage from "./ImageDetailPage";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";


export default function ImageDetailModal({open, handleClose, imageId, prevImageId, afterImageId}) {
    const showPreviousImage = () => {
        imageId = prevImageId
        console.log(imageId)
    }

    const showAfterImage = () => {
        imageId = afterImageId
    }

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
                        <AiOutlineArrowLeft onClick={showPreviousImage} className="click"/>
                        <ImageDetailPage imageId={imageId} key={imageId}/>
                        <AiOutlineArrowRight onClick={showAfterImage} className="click"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}