import Pagination from "../../layout/Pagination";
import {useEffect, useState, useContext} from "react";
import AlbumCard from "../../ui/albums/AlbumCard";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import EmptyPage from "../website/EmptyPage";
import TextField from "@mui/material/TextField";
import {inputHandler, filterData} from "../../../utils/searchBarFunctions";
import {AiFillPlusCircle} from "react-icons/ai";
import {ImageList} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import AddTag from "../tags/AddTag";
import Modal from "@mui/material/Modal";
import AddAlbum from "./AddAlbum";
import UpdateContext from "../../../contexts/UpdateContext";

function ListOfAlbums() {
    const [albumData, setAlbumData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const [showAddForm, setShowAddForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [itemIDs, setItemIDs] = useState([])

    let {authTokens, logoutUser} = useContext(AuthContext)
    let {updatedAlbum} = useContext(UpdateContext)

    const pull_albums = albums => {
        setCurrentItems(albums);
        setItemIDs(currentItems.map(item => item.id));
    }
    const filteredData = filterData(inputText, albumData)

    //Fetch Albums
    useEffect(() => {
        ManageItems({
            endpoint: 'albums',
            method: "GET",
            setFunction: setAlbumData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
        setLoading(true)
    }, [deletedItem, updatedAlbum])

    switch (loading) {
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
                    <AiFillPlusCircle className="click" onClick={() => setShowAddForm(true)}/>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={showAddForm}
                        onClose={() => setShowAddForm(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={showAddForm}>
                            <Box sx={ModalBoxStyle}>
                                <AddAlbum/>
                            </Box>
                        </Fade>
                    </Modal>
                    <ImageList sx={{width: 500, height: 450}} variant="woven" cols={3} gap={8}>
                        {inputText !== ""
                            ? filteredData.map(item =>
                                <AlbumCard key={item.id} data={item} ids={itemIDs} setDeletedItem={setDeletedItem}/>
                            )
                            : currentItems.map(item =>
                                <AlbumCard key={item.id} data={item} ids={itemIDs} setDeletedItem={setDeletedItem}/>
                            )
                        }
                    </ImageList>
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
