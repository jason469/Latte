import {Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


function AlbumCard({data}) {
    return (
        <div>
            <Nav.Link as={Link} to={`/albums/${data.id}`}>
                <Card>
                    {data.cover_image != null &&
                        < Card.Img
                            variant="top"
                            src={data.cover_image}
                            key={data.id}
                            alt={data.name}
                            className="card-img"
                        />
                    }
                    <Card.Body>
                        <Card.Title variant="primary">{data.name}</Card.Title>
                    </Card.Body>
                </Card>
            </Nav.Link>
        </div>
    );
}

export default AlbumCard