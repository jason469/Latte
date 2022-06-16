import classes from "./ImageCard.module.css";
import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


function ImageCard({data}) {
    return (
        <div>
            <Nav.Link as={Link} to={`/images/${data.id}`}>
                <Card>
                    < Card.Img
                        variant="top"
                        src={data.image}
                        key={data.image_id}
                        alt={data.name}
                        className={classes.image}
                    />
                    <Card.Body>
                        <Card.Title variant="primary">{data.name}</Card.Title>
                    </Card.Body>
                </Card>
            </Nav.Link>
        </div>
    );
}

export default ImageCard