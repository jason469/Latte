import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import TextField from "@mui/material/TextField";

import Pagination from "../../layout/Pagination";
import {ManageItems} from "../../../utils/ManageItems";
import EmptyPage from "../website/EmptyPage";
import {filterData, inputHandler} from "../../../utils/searchBarFunctions"
import TagCard from "../../ui/tags/TagCard";
import {AiFillPlusCircle} from "react-icons/ai";
import {ImageList} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ModalBoxStyle} from "../../../utils/ModalBoxStyles";
import Modal from "@mui/material/Modal";
import AddTag from "./AddTag";
import UpdateContext from "../../../contexts/UpdateContext";

import './ListOfTags.css'
import '../../../App.css'


function ListOfTags() {
    const [tagData, setTagData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const [showAddForm, setShowAddForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [itemIDs, setItemIDs] = useState([])

    let {authTokens, logoutUser} = useContext(AuthContext)
    let {updatedItem} = useContext(UpdateContext)

    const pull_tags = tags => {
        setCurrentItems(tags);
        setItemIDs(tags.map(item => item.id));
    }

    const filteredData = filterData(inputText, tagData)

    //Fetch tags
    useEffect(() => {
        ManageItems({
            endpoint: 'tags',
            method: "GET",
            setFunction: setTagData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
        setLoading(true)
    }, [deletedItem, updatedItem])


    switch (loading) {
        case true:
            return (
                <div className="list_of_items">
                    <div className="list_actions">
                        <TextField
                            id="tag_search"
                            onChange={(e) => {
                                inputHandler(e, setInputText)
                            }}
                            variant="outlined"
                            fullWidth
                            label="Search"
                            className="search"
                        />
                        <AiFillPlusCircle
                            className="click add_form"
                            onClick={() => setShowAddForm(true)}
                            size={50}
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
                                <AddTag/>
                            </Box>
                        </Fade>
                    </Modal>
                    <ImageList cols={5} gap={20}>
                        {inputText !== ""
                            ? filteredData.map(item =>
                                <TagCard key={item.id} data={item} ids={itemIDs} setDeletedItem={setDeletedItem}/>)
                            : currentItems.map(item =>
                                <TagCard key={item.id} data={item} ids={itemIDs} setDeletedItem={setDeletedItem}/>)
                        }
                    </ImageList>
                    {inputText === ""
                        && <Pagination
                            itemsPerPage={14}
                            data={tagData}
                            pull_function={pull_tags}
                        />}
                </div>
            )
        case false:
            return (
                <EmptyPage item="Tags"/>
            )
    }
}

export default ListOfTags;
