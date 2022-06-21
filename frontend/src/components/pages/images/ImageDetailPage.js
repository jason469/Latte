import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import {GetItems} from "../../../utils/GetItems";
import AuthContext from "../../../contexts/AuthContext";

function ImageDetailPage() {
    const imageId = useParams().imageId
    const [currentImage, setCurrentImage] = useState({})
    let {authTokens, logoutUser} = useContext(AuthContext)


    useEffect(() => {
        GetItems({
            endpoint: `${imageId}`,
            setFunction: setCurrentImage,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    return (
        <div>
            <img
                src={currentImage[0].fields.image}
                alt={currentImage[0].fields.name}
            />
            <h3>{currentImage[0].fields.name}</h3>
            <strong>Description</strong>
            {currentImage[0].fields.description ?
                <p>{currentImage[0].fields.description}</p> :
                <p>No Description</p>
            }
            <strong>Tags</strong>
            {currentImage[0].fields.tag ?
                currentImage[0].fields.tag.map((tag) => {
                    return <p>{tag.name}</p>
                }) :
                <p>No Tags</p>
            }

            <strong>Albums</strong>
            {currentImage[0].fields.album ?
                currentImage[0].fields.album.map((album) => {
                    return <p>{album.name}</p>
                }) :
                <p>No Albums</p>
            }

        </div>
    )
}

export default ImageDetailPage