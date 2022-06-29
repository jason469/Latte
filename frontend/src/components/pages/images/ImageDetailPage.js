import {useEffect, useState, useContext, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {ManageItems} from "../../../utils/ManageItems";
import AuthContext from "../../../contexts/AuthContext";
import {Card, Nav} from "react-bootstrap";
import TagLabel from "../../ui/tags/TagLabel";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import AlbumLabel from "../../ui/albums/AlbumLabel";
import {AiFillPlusCircle} from "react-icons/ai";
import TagAlbum_Modal from "../../ui/TagAlbum_Modal";

function ImageDetailPage() {
    const imageId = useParams().imageId
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentImage, setCurrentImage] = useState([{fields: {}}])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        ManageItems({
            endpoint: `${imageId}`,
            method: "GET",
            setFunction: setCurrentImage,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [deletedItem])

    return (
        <div>
            <div>
                < Card.Img
                    variant="top"
                    src={currentImage[0].fields.image}
                    alt={currentImage[0].fields.name}
                    className="card-img"
                />
                <AlbumForm  // Need to change the content-type
                    title="Update Images"
                    name={currentImage[0].fields.name}
                    description={currentImage[0].fields.description}
                    method='PATCH'
                    endpoint={`${currentImage[0].pk}/`}
                />
            </div>
            <strong>Tags</strong>
            <AiFillPlusCircle onClick={handleOpen}/>
            <TagAlbum_Modal open={open} handleClose={handleClose} />
            {currentImage[0].fields.tag ?
                currentImage[0].fields.tag.map(tag => {
                    return (
                        <TagLabel data={tag} key={tag.id} image_id={imageId} setDeletedItem={setDeletedItem}/>
                    )
                }) :
                <p>No Tags</p>
            }
            <strong>Albums</strong>
            {currentImage[0].fields.album ?
                currentImage[0].fields.album.map(album => {
                    return (
                        <AlbumLabel data={album} key={album.id} image_id={imageId} setDeletedItem={setDeletedItem}/>
                    )
                }) :
                <p>No Albums</p>
            }
        </div>
    )
}

export default ImageDetailPage