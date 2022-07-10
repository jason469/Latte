import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import {ManageItems} from "../../../utils/ManageItems";
import AuthContext from "../../../contexts/AuthContext";
import TagLabel from "../../ui/tags/TagLabel";
import AlbumLabel from "../../ui/albums/AlbumLabel";
import {AiFillPlusCircle} from "react-icons/ai";
import ImageModal from "../../ui/ImageModal";
import ImageDetailForm from "../../../utils/FormikForms/ImageDetailForm";
import UpdateContext from "../../../contexts/UpdateContext";
import {ImageList} from "@mui/material";
import '../../../App.css'
import './ImageDetailPage.css'


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
    let {updatedItem} = useContext(UpdateContext)

    let {imageId} = useParams();
    if (!imageId) imageId = props.imageId;

    useEffect(() => {
        ManageItems({
            endpoint: `/images/${imageId}`,
            method: "GET",
            setFunction: setCurrentImage,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [deletedItem, updatedItem])

    return (
        <>
            <div>
                <ImageDetailForm
                    title="Update Image"
                    name={currentImage[0].fields.name}
                    description={currentImage[0].fields.description}
                    image={currentImage[0].fields.image}
                    method='PATCH'
                    endpoint={`/images/${currentImage[0].pk}/`}
                />
            </div>
            <div className="add_categories">
                <div className="subtitle">Tags</div>
                <AiFillPlusCircle className="click" onClick={handleTagOpen}/>
            </div>
            <ImageModal open={tagOpen} handleClose={handleTagClose} endpoint="tags" image_id={imageId}/>
            <ImageList cols={4}>
                {currentImage[0].fields.tag ?
                    currentImage[0].fields.tag.map(tag => {
                        return (
                            <TagLabel data={tag} key={tag.id} image_id={imageId} setDeletedItem={setDeletedItem}/>
                        )
                    }) :
                    <p>No Tags</p>
                }
            </ImageList>

            <div className="add_categories">
                <div className="subtitle">Albums</div>
                <AiFillPlusCircle className="click" onClick={handleAlbumOpen}/>
            </div>
            <ImageModal open={albumOpen} handleClose={handleAlbumClose} endpoint="albums" image_id={imageId}/>
            <ImageList cols={4}>
                {currentImage[0].fields.album ?
                    currentImage[0].fields.album.map(album => {
                        return (
                            <AlbumLabel data={album} key={album.id} image_id={imageId}
                                        setDeletedItem={setDeletedItem}/>
                        )
                    }) :
                    <p>No Albums</p>
                }
            </ImageList>
        </>
    )
}

export default ImageDetailPage