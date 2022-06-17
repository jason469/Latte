import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import classes from "./AlbumDetailPage.module.css";

function AlbumDetailPage() {
    const albumId = useParams().albumId
    const [currentAlbum, setCurrentAlbum] = useState({})


    useEffect(() => {
        let url = `http://localhost:8000/api/albums/${albumId}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setCurrentAlbum(data))
    }, [])

    return (
        <div>
            <img
                src={currentAlbum.image}
                key={currentAlbum.image_id}
                alt={currentAlbum.name}
                className={classes.image}
            />
            <h3>{currentAlbum.name}</h3>
            <p>{currentAlbum.description}</p>

        </div>
    )
}

export default AlbumDetailPage