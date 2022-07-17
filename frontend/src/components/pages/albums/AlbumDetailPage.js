import {useEffect, useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import ImageLabel from "../../ui/images/ImageLabel";
import {useParams} from "react-router-dom";
import '../../../App.css'
import {Divider, ImageList} from "@mui/material";


function AlbumDetailPage(props) {
    const [currentAlbum, setCurrentAlbum] = useState({images: [], album_data: {}})
    let {authTokens, logoutUser} = useContext(AuthContext)

    let {albumId} = useParams();
    if (!albumId) albumId = props.albumId;

    useEffect(() => {
        ManageItems({
            endpoint: `/albums/${albumId}`,
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
                endpoint={`/albums/${currentAlbum.album_data.id}/`}
            />
            <Divider variant="middle"/>

            <div className="subtitle">Images</div>
            <ImageList variant="masonry" cols={5} gap={0}>
                {currentAlbum.images.map(image => {
                    return (
                        <ImageLabel data={image} key={image.id}/>
                    )
                })}
            </ImageList>
        < />
    )
}

export default AlbumDetailPage