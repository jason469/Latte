import {useEffect, useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import ImageLabel from "../../ui/images/ImageLabel";

function AlbumDetailPage({albumId}) {
    const [currentAlbum, setCurrentAlbum] = useState({images: [], album_data: {}})
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        ManageItems({
            endpoint: `albums/${albumId}`,
            method: "GET",
            setFunction: setCurrentAlbum,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [albumId])

    return (
        <>
            <AlbumForm
                title="Update Albums"
                name={currentAlbum.album_data.name}
                description={currentAlbum.album_data.description}
                method='PATCH'
                endpoint={`albums/${currentAlbum.album_data.id}/`}
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