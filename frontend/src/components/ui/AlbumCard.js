import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ImCross} from "react-icons/im";
import {ManageItems} from "../../utils/ManageItems";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";


function AlbumCard({data, setDeletedItem=null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)

    return (
        <div>
            <Card>
                {data.cover_image != null &&
                    < Card.Img
                        variant="top"
                        src={data.cover_image}
                        alt={data.name}
                        className="card-img"
                    />
                }
                <Card.Body>
                    <Nav.Link as={Link} to={`/albums/${data.id}`}>
                        <Card.Title variant="primary">{data.name}</Card.Title>
                    </Nav.Link>
                    <ImCross onClick={() => {
                        ManageItems({
                            endpoint: `albums/${data.id}`,
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

export default AlbumCard