import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TagDetailPage from "./TagDetailPage";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {useState} from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import '../../../App.css'


export default function TagDetailModal({open, handleClose, tagId, ids}) {
    const [currentTagId, setCurrentTagId] = useState(tagId);
    const showPreviousTag = () => {
        let prevId = ids[ids.indexOf(currentTagId) - 1]
        setCurrentTagId(prevId)
    }

    const showAfterTag = () => {
        let afterId = ids[ids.indexOf(currentTagId) + 1]
        setCurrentTagId(afterId)
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
                        <AiOutlineArrowLeft onClick={showPreviousTag} className="click"/>
                        <TagDetailPage tagId={currentTagId}/>
                        <AiOutlineArrowRight onClick={showAfterTag} className="click"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}