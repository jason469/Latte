import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import classes from "../images/ImageDetailPage.module.css";

function ImageDetailPage() {
    const imageId = useParams().imageId
    const [currentImage, setCurrentImage] = useState({})


    useEffect(() => {
        let url = `http://localhost:8000/api/images/${imageId}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setCurrentImage(data))
    }, [])

    return (
        <div>
            <img
                src={currentImage.image}
                key={currentImage.image_id}
                alt={currentImage.name}
                className={classes.image}
            />
            <h3>{currentImage.name}</h3>
            <p>{currentImage.description}</p>

        </div>
    )
}

export default ImageDetailPage