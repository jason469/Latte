import classes from './ListOfAlbums.module.css'
import Pagination from "../../layout/Pagination";
import {useEffect, useState, useContext} from "react";
import AlbumCard from "../../ui/AlbumCard";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";
import addImage from "../images/AddImage";

function ListOfAlbums() {
    const [albumData, setAlbumData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_albums = (albums) => {
        setCurrentItems(albums);
    }

    //Fetch Images
    useEffect(() => {
        GetItems({
            endpoint: 'albums',
            setFunction: setAlbumData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
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
