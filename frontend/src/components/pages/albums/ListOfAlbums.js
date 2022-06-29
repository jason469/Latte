import Pagination from "../../layout/Pagination";
import {useEffect, useState, useContext} from "react";
import AlbumCard from "../../ui/albums/AlbumCard";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import EmptyPage from "../website/EmptyPage";
import TextField from "@mui/material/TextField";
import {inputHandler, filterData} from "../../../utils/searchBarFunctions";
import {AiFillPlusCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function ListOfAlbums() {
    const [albumData, setAlbumData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    let {authTokens, logoutUser} = useContext(AuthContext)

    const pull_albums = albums => setCurrentItems(albums);
    const filteredData = filterData(inputText, albumData)
    const navigateToAdd = () => navigate(`/add-album`)

    //Fetch Albums
    useEffect(() => {
        ManageItems({
            endpoint: 'albums',
            method: "GET",
            setFunction: setAlbumData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [deletedItem])

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
                    <AiFillPlusCircle onClick={navigateToAdd}/>
                    <div className="list-of-items">
                        {inputText !== ""
                            ? filteredData.map(item => <AlbumCard key={item.id} data={item}
                                                                  setDeletedItem={setDeletedItem}/>)
                            : currentItems.map(item => <AlbumCard key={item.id} data={item}
                                                                  setDeletedItem={setDeletedItem}/>)
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
