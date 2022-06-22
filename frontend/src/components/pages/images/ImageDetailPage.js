import {useEffect, useState, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {ManageItems} from "../../../utils/ManageItems";
import AuthContext from "../../../contexts/AuthContext";
import {Nav} from "react-bootstrap";
import TagCard from "../../ui/TagCard";

function ImageDetailPage() {
    const imageId = useParams().imageId
    const [currentImage, setCurrentImage] = useState({})
    let {authTokens, logoutUser} = useContext(AuthContext)


    useEffect(() => {
        ManageItems({
            endpoint: `${imageId}`,
            method: "GET",
            setFunction: setCurrentImage,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
            .then(() => console.log(currentImage))
    }, [])

    return (
        <div>
            <img
                src={currentImage.fields.image}
                alt={currentImage.fields.name}
            />
            <h3>{currentImage.fields.name}</h3>
            <strong>Description</strong>
            {currentImage.fields.description ?
                <p>{currentImage.fields.description}</p> :
                <p>No Description</p>
            }
            <strong>Tags</strong>
            {currentImage.fields.tag ?
                currentImage.fields.tag.map((tag) => {
                    return (
                        <TagCard data={tag} key={tag.id} image={currentImage}/>
                    )
                }) :
                <p>No Tags</p>
            }
            <strong>Albums</strong>
            {currentImage.fields.album ?
                currentImage.fields.album.map((album) => {
                    return (
                        <Nav.Link as={Link} to={`/albums/${album.id}`}>
                            <p>{album.name}</p>
                        </Nav.Link>
                    )
                }) :
                <p>No Albums</p>
            }
        </div>
    )
}

export default ImageDetailPage