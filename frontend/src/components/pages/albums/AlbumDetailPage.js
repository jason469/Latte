import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";

function AlbumDetailPage() {
    const albumId = useParams().albumId
    const [currentAlbum, setCurrentAlbum] = useState({})
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        ManageItems({
            endpoint: `${albumId}`,
            method: "GET",
            setFunction: setCurrentAlbum,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    return (
        <div>
            <img
                src={currentAlbum.cover_image}
                alt={currentAlbum.name}
            />
            <h3>{currentAlbum.name}</h3>
            <p>{currentAlbum.description}</p>

        </div>
    )
}

export default AlbumDetailPage