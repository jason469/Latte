import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../../App.css'
import classes from './ImageLabel.module.css'

function ImageLabel({data}) {
    return (
        <div>
            <Nav.Link as={Link} to={`/images/${data.id}`} className={classes.nav_link}>
                <img
                    src={`http://localhost:9000/media/${data.image}`}
                    alt={data.name}
                    loading="lazy"
                    className={classes.image}
                />
            </Nav.Link>
        </div>
    );
}

export default ImageLabel