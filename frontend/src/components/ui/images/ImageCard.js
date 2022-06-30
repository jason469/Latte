import {ImCross} from "react-icons/im";
import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import ImageDetailModal from "../../pages/images/ImageDetailModal";
import {ImageListItem, ImageListItemBar} from "@mui/material";
import '../../../static/images/no_image_available.png';
import ConfirmationDialog from "../ConfirmationDialog";


function ImageCard({data, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);

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
                    src={data.fields.image}
                    alt={"/images/no_image_available.png"}
                    className="image-img"
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