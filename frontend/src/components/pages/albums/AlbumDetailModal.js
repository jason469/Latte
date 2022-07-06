import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AlbumDetailPage from "./AlbumDetailPage";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {useState} from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

export default function AlbumDetailModal({open, handleClose, albumId, ids}) {
    const [currentAlbumId, setCurrentAlbumId] = useState(albumId);
    const showPreviousAlbum = () => {
        let prevId = ids[ids.indexOf(currentAlbumId) - 1]
        setCurrentAlbumId(prevId)
    }

    const showAfterAlbum = () => {
        let afterId = ids[ids.indexOf(currentAlbumId) + 1]
        setCurrentAlbumId(afterId)
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
                        <AiOutlineArrowLeft onClick={showPreviousAlbum} className="click"/>
                        <AlbumDetailPage albumId={currentAlbumId} key={albumId}/>
                        <AiOutlineArrowRight onClick={showAfterAlbum} className="click"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}