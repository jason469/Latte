import Pagination from "../../layout/Pagination";
import {useEffect, useState, useContext} from "react";
import AlbumCard from "../../ui/AlbumCard";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";
import addImage from "../images/AddImage";
import EmptyPage from "../website/EmptyPage";
import TextField from "@mui/material/TextField";
import {inputHandler} from "../../../utils/searchBarFunctions";
import TagCard from "../../ui/TagCard";

function ListOfAlbums() {
    const [albumData, setAlbumData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_albums = (albums) => {
        setCurrentItems(albums);
    }

    const filteredData = albumData.filter(album => {
        if (inputText === '' ||
            album.name.toLowerCase().includes(inputText) ||
            album.description.toLowerCase().includes(inputText)
        ) {
            return album;
        } else {
            return null
        }
    })

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
                    <div className="search">
                        <TextField
                            id="album_search"
                            onChange={(e) => {
                                inputHandler(e, setInputText)
                            }}
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                    </div>
                    <div className="list-of-items">
                        {inputText !== ""
                            ? filteredData.map(item => <AlbumCard key={item.id} data={item}/>)
                            : currentItems.map(item => <AlbumCard key={item.id} data={item}/>)
                        }
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
                <EmptyPage item="Albums"/>
            )
    }
}

export default ListOfAlbums;
