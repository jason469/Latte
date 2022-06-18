import classes from './NavigationBar.module.css'
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";


function NavigationBar() {
    let {user, logoutUser} = useContext(AuthContext)

    return (
        <Navbar bg="light" expand="lg">
            <Container className={classes.navbar}>
                <Navbar.Brand as={Link} to="/" className={classes.brand}>Image App</Navbar.Brand>
                <NavDropdown title="Images" id="image-dropdown" className={classes.image}>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/images">All Images</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-image">Add</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Tags" id="tag-dropdown" className={classes.tags}>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/tags">All Tags</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-tag">Add</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Albums" id="album-dropdown" className={classes.albums}>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/albums">All Albums</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-album">Add</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Profile" id="profile-dropdown" className="ml-auto">
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/api">API</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Item onClick={() => logoutUser()}>Logout</Nav.Item>
                    </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
