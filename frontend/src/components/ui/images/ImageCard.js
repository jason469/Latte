import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext, useEffect} from "react";
import AuthContext from "../../../contexts/AuthContext";
import ImageDetailModal from "../../pages/images/ImageDetailModal";
import {ImageListItem, ImageListItemBar} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'
import ExpandedImage from "./ExpandedImage";


function ImageCard({data, ids, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [expandedImageOpen, setExpandedImageOpen] = useState(false)

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const openExpandedImage = () => setExpandedImageOpen(true);
    const closeExpandedImage = () => setExpandedImageOpen(false);

    const deleteImage = () => {
        ManageItems({
            endpoint: `/images/${data.pk}`,
            method: "DELETE",
            authTokens: authTokens,
            logoutUser: logoutUser,
        })
        setDeletedItem(data.pk)
    }

    return (
        <div>
            <ImageListItem>
                <img
                    src={`http://localhost:9000/media/${data.fields.image}`}
                    alt={"Image not found"}
                    className="click card_image"
                    loading="lazy"
                    onClick={openExpandedImage}
                />
                <div className="card-info">
                    <ImageListItemBar
                        className="click title"
                        subtitle={data.fields.name}
                        onClick={handleModalOpen}
                        position="below"
                    />
                    <ConfirmationDialog
                        deleteItem={deleteImage}
                        title={`Are you sure you want to delete this image?`}
                        content={`This will remove the image`}
                        className="delete-button"
                    />
                </div>
                <ImageDetailModal
                    open={modalOpen}
                    handleClose={handleModalClose}
                    imageId={data.pk}
                    ids={ids}
                />
                <ExpandedImage
                    open={expandedImageOpen}
                    handleClose={closeExpandedImage}
                    image={data.fields.image}
                />
            </ImageListItem>
        </div>
    )
        ;
}

export default ImageCard