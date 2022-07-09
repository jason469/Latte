import {Card} from "react-bootstrap";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import TagDetailModal from "../../pages/tags/TagDetailModal";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'


function TagCard({data, ids, setDeletedItem = null}) {
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
                <Card.Body className="card-info">
                    <Card.Title variant="primary" className="click" onClick={handleModalOpen}>{data.name}</Card.Title>
                    <ConfirmationDialog
                        deleteItem={deleteTag}
                        title={`Are you sure you want to delete this tag?`}
                        content={`This won't delete any images associated with this tag, but it will remove the tag`}
                    />
                    <TagDetailModal
                        open={modalOpen}
                        handleClose={handleModalClose}
                        tagId={data.id}
                        ids={ids}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TagCard