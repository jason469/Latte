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
                src={currentImage.image}
                alt={currentImage.name}
            />
            <h3>{currentImage.name}</h3>
            <strong>Description</strong>
            {currentImage.description ?
                <p>{currentImage.description}</p> :
                <p>No Description</p>
            }
            <strong>Tags</strong>
            {currentImage.tag ?
                <p>{currentImage.tag}</p> :
                <p>No Tags</p>
            }

            <strong>Albums</strong>
            {currentImage.album ?
                <p>{currentImage.album}</p> :
                <p>No Albums</p>
            }

        </div>
    )
}

export default ImageDetailPage