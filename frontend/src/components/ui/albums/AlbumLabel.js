import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'
import classes from "../label.module.css";
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';

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
            <div className={classes.label}>
                <PhotoLibraryRoundedIcon
                    className={classes.icon}
                    sx={{
                        fontSize: "60px",
                        color: "#592a0f"
                    }}
                />
                <Nav.Link
                    as={Link}
                    to={`/albums/${data.id}`}
                    className={classes.title}
                >
                    <Card.Title
                        className={`click title ${classes.titleText}`}
                        variant="primary"
                    >
                        {data.name}
                    </Card.Title>
                </Nav.Link>
                <div className={classes.delete}>
                    <ConfirmationDialog
                        deleteItem={removeAlbum}
                        title={`Are you sure you want to delete this album?`}
                        content={`This will unassign the image from the album`}
                    />
                </div>
            </div>
        </div>
    );
}

export default AlbumLabel