import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ImCross} from "react-icons/im";
import {ManageItems} from "../../../utils/ManageItems";
import ConfirmationDialog from "../ConfirmationDialog";


function TagLabel({data, image_id, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)

    const removeTag = () => {
        const body = {
            action: "Remove tag",
            tag_id: `${data.id}`,
            image_id: `${image_id}`
        };
        ManageItems({
            endpoint: `/images/${data.id}`,
            method: "PATCH",
            authTokens: authTokens,
            logoutUser: logoutUser,
            body: JSON.stringify(body),
        })
        setDeletedItem(data.id)
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <Nav.Link as={Link} to={`/tags/${data.id}`}>
                        <Card.Title className="click" variant="primary">{data.name}</Card.Title>
                    </Nav.Link>
                    <ConfirmationDialog
                        deleteItem={removeTag}
                        title={`Are you sure you want to delete this tag?`}
                        content={`This will unassign the image from the tag`}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TagLabel