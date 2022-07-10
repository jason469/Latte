import {Card} from "react-bootstrap";
import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import AlbumDetailModal from "../../pages/albums/AlbumDetailModal";
import {ImageListItemBar} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'


function AlbumCard({data, ids, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const deleteItem = () => {
        ManageItems({
            endpoint: `albums/${data.id}`,
            method: "DELETE",
            authTokens: authTokens,
            logoutUser: logoutUser,
        })
        setDeletedItem(data.id)
    }

    return (
        <div>
            {data.cover_image != null &&
                < Card.Img
                    variant="top"
                    src={data.cover_image}
                    alt={data.name}
                    className="card-img click"
                    onClick={handleModalOpen}
                />
            }
            <div className="card-info">
                <ImageListItemBar
                    position="below"
                    className="click title"
                    onClick={handleModalOpen}
                    subtitle={data.name}
                />
                <ConfirmationDialog
                    deleteItem={deleteItem}
                    title={`Are you sure you want to delete this album?`}
                    content={`This won't delete any images associated with this album, but it will remove the album`}
                    className="delete-button"
                />
            </div>
            <AlbumDetailModal
                open={modalOpen}
                handleClose={handleModalClose}
                albumId={data.id}
                ids={ids}
            />
        </div>
    );
}

export default AlbumCard