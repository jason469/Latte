import classes from './NavigationBar.module.css'
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";


function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container className={classes.navbar}>
                <Navbar.Brand as={Link} to="/" className={classes.brand}>Image App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <NavDropdown title="Images" id="image-dropdown" className={classes.image}>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/images">All Images</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-image">Add</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/albums">Albums</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Profile" id="profile-dropdown" className="ml-auto" className={classes.profile}>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/api">API</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
