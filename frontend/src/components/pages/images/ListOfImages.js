import Pagination from "../../layout/Pagination";
import {useContext, useEffect, useState} from "react";
import ImageCard from "../../ui/images/ImageCard";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import EmptyPage from "../website/EmptyPage";
import TextField from "@mui/material/TextField";
import {filterData, inputHandler} from "../../../utils/searchBarFunctions";
import {AiFillPlusCircle} from "react-icons/ai";
import {ImageList} from "@mui/material";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import AddImage from "./AddImage";

function ListOfImages() {
    const [imageData, setImageData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const [showAddForm, setShowAddForm] = useState(false)
    const [loading, setLoading] = useState(false)

    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_images = images => setCurrentItems(images)
    const filteredData = filterData(inputText, imageData)

    //Fetch Images
    useEffect(() => {
        ManageItems({
            endpoint: '/images',
            method: "GET",
            setFunction: setImageData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
        setLoading(true)
    }, [deletedItem, imageData])

    switch (loading) {
        case true:
            return (
                <div>
                    <div className="search">
                        <TextField
                            id="image_search"
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
                                <AddImage/>
                            </Box>
                        </Fade>
                    </Modal>
                    <ImageList variant="masonry" cols={4} gap={5}>
                        {inputText !== ""
                            ? filteredData.map(item =>
                                <ImageCard key={item.pk} data={item} setDeletedItem={setDeletedItem}/>
                            )
                            : currentItems.map(item =>
                                <ImageCard key={item.pk} data={item} setDeletedItem={setDeletedItem}/>
                            )
                        }
                    </ImageList>
                    <Pagination
                        itemsPerPage={12}
                        data={imageData}
                        pull_function={pull_images}
                    />
                </div>
            )
        case false:
            return (<EmptyPage item="Images"/>)
    }
}

export default ListOfImages;
