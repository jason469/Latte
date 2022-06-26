import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import {ImCross} from "react-icons/im";
import {ManageItems} from "../../utils/ManageItems";


function TagCard({data, setDeletedItem}) {
    let {authTokens, logoutUser} = useContext(AuthContext)

    return (
        <div>
            <Card>
                <Card.Body>
                    <Nav.Link as={Link} to={`/tags/${data.id}`}>
                        <Card.Title variant="primary">{data.name}</Card.Title>
                    </Nav.Link>
                    <ImCross onClick={() => {
                        ManageItems({
                            endpoint: `tags/${data.id}`,
                            method: "DELETE",
                            authTokens: authTokens,
                            logoutUser: logoutUser,
                        })
                        setDeletedItem(data.id)
                    }}/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default TagCard