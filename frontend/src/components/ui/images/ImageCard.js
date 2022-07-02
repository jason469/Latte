import {ImCross} from "react-icons/im";
import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import ImageDetailModal from "../../pages/images/ImageDetailModal";
import {ImageListItem, ImageListItemBar} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog";


function ImageCard({data, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(data.fields.image)

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

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
                    className="image-img click"
                    onClick={handleModalOpen}
                />
                <ImageListItemBar
                    onClick={handleModalOpen}
                    className="click"
                    title={data.fields.name}
                    subtitle={data.fields.description}
                    actionIcon={
                        <ConfirmationDialog
                            deleteItem={deleteImage}
                            title={`Are you sure you want to delete this image?`}
                            content={`This will remove the image`}
                        />
                    }
                />
                <ImageDetailModal open={modalOpen} handleClose={handleModalClose} imageId={data.pk}/>
            </ImageListItem>
        </div>
    )
        ;
}

export default ImageCard