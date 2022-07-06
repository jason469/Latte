import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageDetailPage from "./ImageDetailPage";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {useState} from "react";

export default function ImageDetailModal({open, handleClose, imageId, ids}) {
    const [currentImageId, setCurrentImageId] = useState(imageId);
    const showPreviousImage = () => {
        let prevId = ids[ids.indexOf(currentImageId) - 1]
        setCurrentImageId(prevId)
    }

    const showAfterImage = () => {
        let afterId = ids[ids.indexOf(currentImageId) + 1]
        setCurrentImageId(afterId)
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
                        <ImageDetailPage imageId={currentImageId} key={imageId}/>
                        <AiOutlineArrowRight onClick={showAfterImage} className="click"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}