import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import classes from "../ui/ImageCard.module.css";

function ImageDetailPage() {
    const imageId = useParams().imageId
    const [currentImage, setCurrentImage] = useState({})


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/?id=${imageId}`)
            .then(response => response.json())
            .then(json => setCurrentImage(json[0]))
    }, [])

    return (
        <div>
            <img
                src={currentImage.url}
                key={currentImage.id}
                alt={currentImage.title}
                className={classes.image}
            />
            <h3>{currentImage.title}</h3>

        </div>
    )
}

export default ImageDetailPage