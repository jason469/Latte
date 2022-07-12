import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/base/ModalUnstyled';
import Fade from '@mui/material/Fade';
import AlbumDetailPage from "./AlbumDetailPage";
import {ArrowBoxStyle, ModalBoxStyle, TagModalBoxStyle} from "../../../utils/ModalBoxStyles";
import {useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import '../../../App.css'

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
                    <Box sx={ArrowBoxStyle} className="detail_modal_box">
                        <IoIosArrowBack onClick={showPreviousAlbum} className="click arrow" size={50}
                                        id="back_arrow"/>
                        <Box sx={TagModalBoxStyle}>
                            <AlbumDetailPage albumId={currentAlbumId} key={albumId}/>
                        </Box>
                        <IoIosArrowForward onClick={showAfterAlbum} className="click arrow" size={50}
                                           id="forward_arrow"/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}