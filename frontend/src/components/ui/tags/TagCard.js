import {Card} from "react-bootstrap";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import TagDetailModal from "../../pages/tags/TagDetailModal";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'
import classes from './TagCard.module.css'
import {Typography} from "@mui/material";


function TagCard({data, ids, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <div>
            <Typography variant="h5"
                        component="div"
                        className={`click title ${classes.title}`}
                        onClick={handleModalOpen}>
                {data.name}
            </Typography>
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