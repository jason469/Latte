import '../../../App.css'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ExpandedImageStyle} from "../../../utils/ModalBoxStyles";

function ExpandedImage({open, handleClose, image}) {
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
                            src={`${process.env.BACKEND_API_URL}/media/${image}`}
                            alt={"Image not found"}
                            loading="lazy"
                            className={`click expanded-image`}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
        ;
}

export default ExpandedImage