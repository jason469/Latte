import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";


function ImageLabel({data}) {

    return (
        <div>
            <Card>
                <Nav.Link as={Link} to={`/images/${data.id}`}>
                    < Card.Img
                        variant="top"
                        src={data.image}
                        alt={data.name}
                        className="card-img"
                    />
                    <Card.Body>
                        <Card.Title className="click" variant="primary">{data.name}</Card.Title>
                    </Card.Body>
                </Nav.Link>
            </Card>
        </div>
    )
        ;
}

export default ImageLabel