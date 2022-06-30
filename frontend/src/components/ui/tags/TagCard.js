import {Card} from "react-bootstrap";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ImCross} from "react-icons/im";
import {ManageItems} from "../../../utils/ManageItems";
import TagDetailModal from "../../pages/tags/TagDetailModal";
import ConfirmationDialog from "../ConfirmationDialog";


function TagCard({data, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const deleteTag = () => {
        ManageItems({
            endpoint: `tags/${data.id}`,
            method: "DELETE",
            authTokens: authTokens,
            logoutUser: logoutUser,
        })
        setDeletedItem(data.id)
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title variant="primary" className="click" onClick={handleModalOpen}>{data.name}</Card.Title>
                    <TagDetailModal open={modalOpen} handleClose={handleModalClose} tagId={data.id}/>
                    <ConfirmationDialog
                        deleteItem={deleteTag}
                        title={`Are you sure you want to delete this tag?`}
                        content={`This won't delete any images associated with this tag, but it will remove the tag`}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TagCard