import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


function TagCard({data}) {
    return (
        <div>
            <Nav.Link as={Link} to={`/tags/${data.id}`}>
                <Card>
                    <Card.Body>
                        <Card.Title variant="primary">{data.name}</Card.Title>
                        <Card.Text variant="primary">{data.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Nav.Link>
        </div>
    );
}

export default TagCard