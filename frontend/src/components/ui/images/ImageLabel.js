import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../../App.css'

function ImageLabel({data}) {
    return (
        <div>
            <Nav.Link as={Link} to={`/images/${data.id}`}>
                <img
                    src={`http://localhost:9000/media/${data.image}`}
                    alt={data.name}
                    loading="lazy"
                />
            </Nav.Link>
        </div>
    );
}

export default ImageLabel