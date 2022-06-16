import classes from './ListOfImages.module.css'
import Pagination from "../../layout/Pagination";
import {useEffect, useState} from "react";
import ImageCard from "../../ui/ImageCard";

function ListOfImages() {
    const [imageData, setImageData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);

    // Fetch current items
    const pull_images = (images) => {
        setCurrentItems(images);
    }

    //Fetch photos
    useEffect(() => {
        let url = 'http://localhost:8000/api/images/';
        fetch(url)
            .then(response => response.json())
            .then(data => setImageData(data))
    }, [])

    return (
        <div>
            <div className={classes.images}>
                {currentItems.map(item => <ImageCard data={item}/>)}
            </div>
            <Pagination
                itemsPerPage={12}
                data={imageData}
                pull_function={pull_images}
            />
        </div>
    )
}

export default ListOfImages;
