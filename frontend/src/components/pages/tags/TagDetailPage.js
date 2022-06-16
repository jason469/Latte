import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import classes from "./TagDetailPage.module.css";

function TagDetailPage() {
    const tagId = useParams().tagId
    const [currentTag, setCurrentTag] = useState({})


    useEffect(() => {
        let url = `http://localhost:8000/api/tags/${tagId}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setCurrentTag(data))
    }, [])

    return (
        <div>
            <h3>{currentTag.name}</h3>
            <p>{currentTag.description}</p>

        </div>
    )
}

export default TagDetailPage