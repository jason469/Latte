import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import ConfirmationDialog from "../ConfirmationDialog";
import '../../../App.css'
import classes from "../label.module.css";
import SellRoundedIcon from "@mui/icons-material/SellRounded";


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
            <div className={classes.label}>
                <SellRoundedIcon
                    className={classes.icon}
                    sx={{
                        fontSize: "60px",
                        color: "#592a0f"
                    }}
                />
                <Nav.Link
                    as={Link}
                    to={`/tags/${data.id}`}
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
                    deleteItem={removeTag}
                    title={`Are you sure you want to delete this tag?`}
                    content={`This will unassign the image from the tag`}
                />
                    </div>
            </div>
        </div>
    );
}

export default TagLabel