import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import ImageLabel from "../../ui/ImageLabel";

function AlbumDetailPage() {
    const albumId = useParams().albumId
    const [currentAlbum, setCurrentAlbum] = useState({images: [], album_data: {}})
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
            <AlbumForm  // Need to change the content-type
                title="Update Albums"
                name={currentAlbum.album_data.name}
                description={currentAlbum.album_data.description}
                method='PATCH'
                endpoint={`${currentAlbum.album_data.id}/`}
            />

            <strong>Images</strong>
            {currentAlbum.images.map(image => {
                return (
                    <ImageLabel data={image} key={image.id}/>
                )
            })}
        < />
    )
}

export default AlbumDetailPage