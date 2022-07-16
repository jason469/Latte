import React, {useContext, useEffect, useState} from 'react'
import AuthContext from "../../../contexts/AuthContext";
import UpdateContext from "../../../contexts/UpdateContext";
import {ManageItems} from "../../../utils/ManageItems";
import TextField from "@mui/material/TextField";
import {filterData, inputHandler} from "../../../utils/searchBarFunctions";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import {ImageList} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import AddImage from "./AddImage";
import Pagination from "../../layout/Pagination";
import ImageCard from "../../ui/images/ImageCard";
import EmptyPage from "../website/EmptyPage";
import RangeSelector from "../../ui/RangeSelector";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";

import '../../../App.css'
import classes from './ListOfImages.module.css'


function ListOfImages() {
    const [imageData, setImageData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("");
    const [showAddForm, setShowAddForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    let {authTokens, logoutUser} = useContext(AuthContext)
    let {updatedItem} = useContext(UpdateContext)

    // Fetch current items
    const pull_images = images => {
        setCurrentItems(images)
        setLoading(true)
    }
    const filteredData = filterData(inputText, imageData, true, searchCriteria)

    //Fetch Images
    useEffect(() => {
        ManageItems({
            endpoint: '/images',
            method: "GET",
            setFunction: setImageData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [deletedItem, updatedItem])

    switch (loading) {
        case true:
            return (
                <>
                    <div className="list_of_items">
                        <div className="list_actions">
                            <TextField
                                id="image_search"
                                onChange={(e) => {
                                    inputHandler(e, setInputText)
                                }}
                                variant="outlined"
                                fullWidth
                                label="Search"
                                className={classes.search}
                            />
                            <TextField
                                className={classes.search_criteria}
                                label="Search Criteria"
                                onChange={e => {
                                    setSearchCriteria(e.target.value)
                                }}
                                select
                                value={searchCriteria}
                            >
                                <MenuItem value={"album"}>Album</MenuItem>
                                <MenuItem value={"tag"}>Tag</MenuItem>
                                <MenuItem value={"name"}>Name</MenuItem>
                                <MenuItem value={"desc"}>Description</MenuItem>
                            </TextField>
                            <RangeSelector
                                value={itemsPerPage}
                                setFunction={setItemsPerPage}
                            />
                            <AddPhotoAlternateRoundedIcon
                                className="click add_form"
                                onClick={() => setShowAddForm(true)}
                                sx={{
                                    fontSize: 60,
                                    color: "#592a0f"
                            }}
                            />
                        </div>
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
                        <ImageList variant="masonry" cols={6}>
                            {inputText !== ""
                                ? filteredData.map(item =>
                                    <ImageCard key={item.pk} data={item} images={currentItems}
                                               setDeletedItem={setDeletedItem}/>
                                )
                                : currentItems.map(item =>
                                    <ImageCard key={item.pk} data={item} images={currentItems}
                                               setDeletedItem={setDeletedItem}/>
                                )
                            }
                        </ImageList>
                    </div>
                    {inputText === ""
                        && <Pagination
                            itemsPerPage={itemsPerPage}
                            data={imageData}
                            pull_function={pull_images}
                        />
                    }
                </>
            )
        case false:
            return (
                <>
                    <EmptyPage item="Images"/>
                    {inputText === ""
                        && <Pagination
                            itemsPerPage={itemsPerPage}
                            data={imageData}
                            pull_function={pull_images}
                        />
                    }
                </>
            )
    }
}

export default ListOfImages;
