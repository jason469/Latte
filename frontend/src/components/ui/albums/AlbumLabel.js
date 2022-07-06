import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ImCross} from "react-icons/im";
import {ManageItems} from "../../../utils/ManageItems";
import ConfirmationDialog from "../ConfirmationDialog";


function AlbumLabel({data, image_id, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)

    const removeAlbum = () => {
        const body = {
            action: "Remove album",
            album_id: `${data.id}`,
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
                    <Nav.Link as={Link} to={`/albums/${data.id}`}>
                        <Card.Title className="click" variant="primary">{data.name}</Card.Title>
                    </Nav.Link>
                    <ConfirmationDialog
                        deleteItem={removeAlbum}
                        title={`Are you sure you want to delete this album?`}
                        content={`This will unassign the image from the album`}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default AlbumLabel