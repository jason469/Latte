import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../../App.css'

function ImageLabel({data}) {
    return (
        <div className="label">
            <Card>
                <Nav.Link as={Link} to={`/images/${data.id}`}>
                    < Card.Img
                        variant="top"
                        src={`http://localhost:9000/media/${data.image}`}
                        alt={data.name}
                        className="img"
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