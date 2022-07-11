import '../../../App.css'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ExpandedImageStyle} from "../../../utils/ModalBoxStyles";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {useState} from "react";

function ExpandedImage({open, handleClose, image, ids}) {
    const [currentImageId, setCurrentImageId] = useState(image);
    console.log(image)
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
                    <Box sx={ExpandedImageStyle}>
                        <img
                            src={`http://localhost:9000/media/${image}`}
                            alt={"Image not found"}
                            loading="lazy"
                            className="click expanded-image"
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
        ;
}

export default ExpandedImage