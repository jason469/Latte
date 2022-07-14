import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageDetailPage from "./ImageDetailPage";
import {ArrowBoxStyle, ExpandedImageStyle, ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import {useState} from "react";
import '../../../App.css'


export default function ImageDetailModal({open, handleClose, image, images, expandedImage}) {
    const [currentImage, setCurrentImage] = useState(image);
    const showPreviousImage = () => {
        if ((images[images.indexOf(currentImage) - 1]) === undefined) {
            setCurrentImage(images[images.length])
        } else {
            setCurrentImage(images[images.indexOf(currentImage) - 1])
        }
    }

    const showAfterImage = () => {
        if ((images[images.indexOf(currentImage) - 1]) === undefined) {
            setCurrentImage(images[1])
        } else {
            setCurrentImage(images[images.indexOf(currentImage) + 1])
        }
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
                        {(expandedImage
                                ? <Box sx={ModalBoxStyle}>
                                    <ImageDetailPage
                                        imageId={currentImage.pk}
                                        key={currentImage.pk}
                                    />
                                </Box>
                                : <Box sx={ExpandedImageStyle}>
                                    <img
                                        src={`http://localhost:9000/media/${currentImage.fields.image}`}
                                        alt={"Image not found"}
                                        loading="lazy"
                                        className="click expanded-image"
                                    />
                                </Box>
                        )}
                        <IoIosArrowForward onClick={showAfterImage} className="click arrow" size={50}
                                           id="forward_arrow"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}