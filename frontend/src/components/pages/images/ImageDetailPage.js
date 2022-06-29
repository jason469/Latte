import {useEffect, useState, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {ManageItems} from "../../../utils/ManageItems";
import AuthContext from "../../../contexts/AuthContext";
import {Card, Nav} from "react-bootstrap";
import TagLabel from "../../ui/tags/TagLabel";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import AlbumLabel from "../../ui/albums/AlbumLabel";
import {AiFillPlusCircle} from "react-icons/ai";
import ImageModal from "../../ui/ImageModal";

function ImageDetailPage(props) {
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentImage, setCurrentImage] = useState([{fields: {}}])

    const [tagOpen, setTagOpen] = useState(false);
    const [albumOpen, setAlbumOpen] = useState(false);

    const handleTagOpen = () => setTagOpen(true);
    const handleTagClose = () => setTagOpen(false);

    const handleAlbumOpen = () => setAlbumOpen(true);
    const handleAlbumClose = () => setAlbumOpen(false);


    let {authTokens, logoutUser} = useContext(AuthContext)

    console.log(useParams().imageId)
    let {imageId} = useParams();
    if (!imageId) imageId = props.imageId;
    console.log(imageId)

    useEffect(() => {
        ManageItems({
            endpoint: `/images/${imageId}`,
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
                    endpoint={`/images/${currentImage[0].pk}/`}
                />
            </div>
            <strong>Tags</strong>
            <AiFillPlusCircle onClick={handleTagOpen}/>
            <ImageModal open={tagOpen} handleClose={handleTagClose} endpoint="tags" image_id={imageId}/>
            {currentImage[0].fields.tag ?
                currentImage[0].fields.tag.map(tag => {
                    return (
                        <TagLabel data={tag} key={tag.id} image_id={imageId} setDeletedItem={setDeletedItem}/>
                    )
                }) :
                <p>No Tags</p>
            }
            <strong>Albums</strong>
            <AiFillPlusCircle onClick={handleAlbumOpen}/>
            <ImageModal open={albumOpen} handleClose={handleAlbumClose} endpoint="albums" image_id={imageId}/>
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