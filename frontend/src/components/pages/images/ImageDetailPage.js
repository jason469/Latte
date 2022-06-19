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
                key={currentImage.image_id}
                alt={currentImage.name}
            />
            <h3>{currentImage.name}</h3>
            <p>{currentImage.description}</p>

        </div>
    )
}

export default ImageDetailPage