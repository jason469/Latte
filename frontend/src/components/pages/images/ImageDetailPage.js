import {useEffect, useState, useContext, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {ManageItems} from "../../../utils/ManageItems";
import AuthContext from "../../../contexts/AuthContext";
import {Nav} from "react-bootstrap";
import TagCard from "../../ui/TagCard";
import AlbumCard from "../../ui/AlbumCard";
import TagLabel from "../../ui/TagLabel";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import AlbumLabel from "../../ui/AlbumLabel";

function ImageDetailPage() {
    const imageId = useParams().imageId
    const [currentImage, setCurrentImage] = useState([{fields: {}}])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        ManageItems({
            endpoint: `${imageId}`,
            method: "GET",
            setFunction: setCurrentImage,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    return (
        <div>
            <div>
                <AlbumForm  // Need to change the content-type
                    title="Update Albums"
                    name={currentImage[0].fields.name}
                    description={currentImage[0].fields.description}
                    method='PATCH'
                    endpoint={`${currentImage[0].pk}/`}
                />
            </div>
            <strong>Tags</strong>
            {currentImage[0].fields.tag ?
                currentImage[0].fields.tag.map(tag => {
                    return (
                        <TagLabel data={tag} key={tag.id} image_id={imageId}/>
                    )
                }) :
                <p>No Tags</p>
            }
            <strong>Albums</strong>
            {currentImage[0].fields.album ?
                currentImage[0].fields.album.map(album => {
                    return (
                        <AlbumLabel data={album} key={album.id} image_id={imageId}/>
                    )
                }) :
                <p>No Albums</p>
            }
        </div>
    )
}

export default ImageDetailPage