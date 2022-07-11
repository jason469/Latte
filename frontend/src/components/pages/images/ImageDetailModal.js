import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageDetailPage from "./ImageDetailPage";
import {ArrowBoxStyle, ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import {useState} from "react";
import '../../../App.css'


export default function ImageDetailModal({open, handleClose, imageId, ids}) {
    const [currentImageId, setCurrentImageId] = useState(imageId);
    const showPreviousImage = () => {
        setCurrentImageId(ids[ids.indexOf(currentImageId) - 1])
    }

    const showAfterImage = () => {
        setCurrentImageId(ids[ids.indexOf(currentImageId) + 1])
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
                    <Box sx={ArrowBoxStyle} className="detail_modal_box">
                        <IoIosArrowBack onClick={showPreviousImage} className="click arrow" size={50}
                                            id="back_arrow"/>
                        <Box sx={ModalBoxStyle}>
                            <ImageDetailPage imageId={currentImageId} key={currentImageId}/>
                        </Box>
                        <IoIosArrowForward onClick={showAfterImage} className="click arrow" size={50}
                                             id="forward_arrow"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}