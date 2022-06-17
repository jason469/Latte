import classes from './ListOfAlbums.module.css'
import Pagination from "../../layout/Pagination";
import {useEffect, useState} from "react";
import AlbumCard from "../../ui/AlbumCard";

function ListOfAlbums() {
    const [albumData, setAlbumData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);

    // Fetch current items
    const pull_albums = (albums) => {
        setCurrentItems(albums);
    }

    //Fetch tags
    useEffect(() => {
        let url = 'http://localhost:8000/api/albums/';
        fetch(url)
            .then(response => response.json())
            .then(data => setAlbumData(data))
    }, [])

    return (
        <div>
            <div className={classes.images}>
                {currentItems.map(item => <AlbumCard data={item}/>)}
            </div>
            <Pagination
                itemsPerPage={12}
                data={albumData}
                pull_function={pull_albums}
            />
        </div>
    )
}

export default ListOfAlbums;
