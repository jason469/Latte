import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


function ImageCard({data}) {
    return (
        <div>
            <Nav.Link as={Link} to={`/images/${data.pk}`}>
                <Card>
                    < Card.Img
                        variant="top"
                        src={data.fields.image}
                        alt={data.fields.name}
                        className="card-img"
                    />
                    <Card.Body>
                        <Card.Title variant="primary">{data.fields.name}</Card.Title>
                    </Card.Body>
                </Card>
            </Nav.Link>
        </div>
    );
}

export default ImageCard