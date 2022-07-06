import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BiPlusMedical} from "react-icons/bi";
import {ManageItems} from "../../utils/ManageItems";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import UpdateContext from "../../contexts/UpdateContext";
import '../../App.css'


function ImageModalCard({data, item_name, image_id}) {
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
        setUpdatedItem(Math.random())
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title variant="primary">
                        <Nav.Link as={Link} to={`/${item_name}/${data.id}`}>
                            {data.name}
                        </Nav.Link>
                        <BiPlusMedical className="click" onClick={addItem}/>
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ImageModalCard