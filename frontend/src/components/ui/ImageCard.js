import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ImCross} from "react-icons/im";
import {ManageItems} from "../../utils/ManageItems";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";


function ImageCard({data, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)

    return (
        <div>
            <Card>
                <Nav.Link as={Link} to={`/images/${data.pk}`}>
                    < Card.Img
                        variant="top"
                        src={data.fields.image}
                        alt={data.fields.name}
                        className="card-img"
                    />
                    <Card.Body>
                        <Card.Title variant="primary">{data.fields.name}</Card.Title>
                        <ImCross onClick={() => {
                            ManageItems({
                                endpoint: `/images/${data.pk}`,
                                method: "DELETE",
                                authTokens: authTokens,
                                logoutUser: logoutUser,
                            })
                            setDeletedItem(data.id)
                        }}/>
                    </Card.Body>
                </Nav.Link>
            </Card>
        </div>
    )
        ;
}

export default ImageCard