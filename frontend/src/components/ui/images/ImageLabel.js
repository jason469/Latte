import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../../App.css'
import './ImageLabel.css'
import {ImageListItemBar} from "@mui/material";

function ImageLabel({data}) {
    return (
        <div className="label">
            <Nav.Link as={Link} to={`/images/${data.id}`} className="nav-link">
                <img
                    src={`http://localhost:9000/media/${data.image}`}
                    alt={data.name}
                    loading="lazy"
                    className="img"
                />
            </Nav.Link>
        </div>
    );
}

export default ImageLabel