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
import {ImageList} from "@mui/material";
import FormSubmitMessage from "./FormSubmitMessage";

import '../../App.css'

export default function ImageModal({open, handleClose, endpoint, image_id}) {
    const [inputText, setInputText] = useState("");
    const [allItems, setAllItems] = useState([]);
    const [formOutcome, setFormOutcome] = useState(null);

    let {updatedItem} = useContext(UpdateContext)

    let {authTokens, logoutUser} = useContext(AuthContext)

    const filteredItems = filterData(inputText, allItems)

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
                        <FormSubmitMessage
                            formOutcome={formOutcome}
                            setFormOutcome={setFormOutcome}
                        />
                        <ImageList cols={6} gap={10}>
                            {inputText !== ""
                                ? filteredItems.map(item => <ImageModalCard data={item}
                                                                            item_name={endpoint}
                                                                            image_id={image_id}
                                                                            setFormOutcome={setFormOutcome}
                                                                            key={item.id}
                                />)
                                : <p>No items match that name</p>
                            }
                        </ImageList>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}