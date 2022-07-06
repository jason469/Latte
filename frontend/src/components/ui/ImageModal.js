import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useState, useContext, useEffect} from "react";
import TextField from "@mui/material/TextField";
import {filterData, inputHandler} from "../../utils/searchBarFunctions";
import {ManageItems} from "../../utils/ManageItems";
import AuthContext from "../../contexts/AuthContext";
import ImageModalCard from "./ImageModalCard";
import {ModalBoxStyle} from "../../utils/ModalBoxStyles";
import UpdateContext from "../../contexts/UpdateContext";
import '../../App.css'

export default function ImageModal({open, handleClose, endpoint, image_id}) {
    const [inputText, setInputText] = useState("");
    const [allItems, setAllItems] = useState([]);
    let {updatedItem} = useContext(UpdateContext)

    let {authTokens, logoutUser} = useContext(AuthContext)

    const filteredTags = filterData(inputText, allItems)

    useEffect(() => {
        ManageItems({
            endpoint: `/${endpoint}`,
            method: "GET",
            setFunction: setAllItems,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [updatedItem])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={ModalBoxStyle}>
                        <div className="search">
                            <TextField
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
                                ? filteredTags.map(item => <ImageModalCard data={item} item_name={endpoint} image_id={image_id}/>)
                                : <p>No items match that name</p>
                            }
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}