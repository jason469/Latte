import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext, useEffect} from "react";
import AuthContext from "../../../contexts/AuthContext";
import ImageDetailModal from "../../pages/images/ImageDetailModal";
import {ImageListItem, ImageListItemBar} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'
import classes from './ImageCard.module.css'
import ExpandedImage from "./ExpandedImage";
import {CardActionArea} from "@mui/material"


function ImageCard({data, images, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [expandedImage, setExpandedImage] = useState(false)

    const handleModalClose = () => setModalOpen(false);
    const handleExpandedImage = () => {
        setModalOpen(true)
        setExpandedImage(false)
    }
    const handleDetailForm = () => {
        setModalOpen(true)
        setExpandedImage(true)
    }

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
            <ImageListItem className={classes.imageCard}>
                <CardActionArea>
                    <img
                        src={`http://localhost:9000/media/${data.fields.image}`}
                        alt={"Image not found"}
                        className={`click ${classes.card_image}`}
                        loading="lazy"
                        onClick={handleExpandedImage}
                    />
                </CardActionArea>
                <div className={`card-info ${classes.image_card_bar}`}>
                    <ImageListItemBar
                        className={`click title`}
                        subtitle={data.fields.name}
                        onClick={handleDetailForm}
                        position="below"
                    />
                    <ConfirmationDialog
                        deleteItem={deleteImage}
                        title={`Are you sure you want to delete this image?`}
                        content={`This will remove the image`}
                        className="delete-button"
                    />
                </div>
            </ImageListItem>
            <ImageDetailModal
                open={modalOpen}
                handleClose={handleModalClose}
                image={data}
                images={images}
                expandedImage={expandedImage}
            />
        </div>
    )
        ;
}

export default ImageCard