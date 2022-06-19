import Pagination from "../../layout/Pagination";
import {useEffect, useState, useContext} from "react";
import AlbumCard from "../../ui/AlbumCard";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";
import addImage from "../images/AddImage";
import EmptyPage from "../website/EmptyPage";

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

    switch (albumData.length !== 0) {
        case true:
            return (
                <div>
                    <div className="list-of-items">
                        {currentItems.map(item => <AlbumCard key={item.id} data={item}/>)}
                    </div>
                    <Pagination
                        itemsPerPage={12}
                        data={albumData}
                        pull_function={pull_albums}
                    />
                </div>
            )
        case false:
            return (
                <EmptyPage item="Albums" />
            )
    }
}

export default ListOfAlbums;
