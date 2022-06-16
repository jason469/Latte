import classes from './AllImages.module.css'
import Pagination from "../layout/Pagination";
import {useEffect, useState} from "react";

function AllImages() {
    const [imageData, setImageData] = useState([])

    //Fetch photos
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => data.slice(0, 50))
            .then(slicedData => setImageData(slicedData))
    }, [])

    return (
        <div>
            <Pagination itemsPerPage={12} data={imageData}/>
        </div>
    )
}

export default AllImages;
