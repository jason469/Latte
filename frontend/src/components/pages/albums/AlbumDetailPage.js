import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";

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
        <>
            <AlbumForm
                title="Update Albums"
                name={currentAlbum.name}
                description={currentAlbum.description}
                method='PATCH'
                endpoint={`${currentAlbum.id}/`}
            />
        </>
    )
}

export default AlbumDetailPage