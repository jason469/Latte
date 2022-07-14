import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BiPlusMedical} from "react-icons/bi";
import {ManageItems} from "../../utils/ManageItems";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import UpdateContext from "../../contexts/UpdateContext";
import {CheckFormOutcome} from "../../utils/CheckFormOutcome";

import '../../App.css'
import classes from "./tags/TagCard.module.css";


function ImageModalCard({data, item_name, image_id, setFormOutcome}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let {setUpdatedItem} = useContext(UpdateContext)

    const addItem = () => {
        const body = {
            action: "Add Item to Image",
            item_name: `${item_name}`,
            id: `${data.id}`,
            image_id: `${image_id}`
        };
        ManageItems({
            endpoint: `/images/${data.id}`,
            method: "PATCH",
            authTokens: authTokens,
            logoutUser: logoutUser,
            body: JSON.stringify(body),
        })
            .then(response => CheckFormOutcome(response.status, setFormOutcome))
            .then(() => setUpdatedItem(Math.random()))
    }
    return (
        <div>
            <Card className={classes.card}>
                <Card.Body className="card-info">
                    <Card.Title variant="primary" className={`click title ${classes.title}`}>
                        <Nav.Link as={Link} to={`/${item_name}/${data.id}`}>
                            {data.name}
                        </Nav.Link>
                    </Card.Title>
                    <BiPlusMedical className="click" onClick={addItem} size={10}/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ImageModalCard