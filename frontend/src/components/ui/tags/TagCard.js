import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import TagDetailModal from "../../pages/tags/TagDetailModal";
import {Typography} from "@mui/material";
import SellRoundedIcon from '@mui/icons-material/SellRounded';

import '../../../App.css'
import classes from './TagCard.module.css'


function TagCard({data, ids, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <div>
            <div
                onClick={handleModalOpen}
                className={`click ${classes.tagCard}`}
            >
                <SellRoundedIcon
                    className={classes.tagIcon}
                    sx={{fontSize: "40px",
                        color: "#592a0f"
                    }}
                />
                <Typography variant="body"
                            component="div"
                            className={`title ${classes.title}`}>
                    {data.name}
                </Typography>
            </div>
            <TagDetailModal
                open={modalOpen}
                handleClose={handleModalClose}
                tagId={data.id}
                ids={ids}
                setDeletedItem={setDeletedItem}
            />
        </div>
    );
}

export default TagCard