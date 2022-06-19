import './NavigationBar.module.css'
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdImages, IoMdPricetags, IoIosAlbums } from "react-icons/io";


function NavigationBar() {
    let {logoutUser} = useContext(AuthContext)

    return (
        <Navbar bg="light" expand="lg">
            <Container className="navbar">
                <Navbar.Brand as={Link} to="/" className="brand">Image App</Navbar.Brand>
                <NavDropdown title={<IoMdImages />} id="image-dropdown" className="image">
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/images">All Images</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-image">Add</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<IoMdPricetags />} id="tag-dropdown" className="tags">
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/tags">All Tags</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-tag">Add</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<IoIosAlbums />} id="album-dropdown" className="albums">
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/albums">All Albums</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Nav.Link as={Link} to="/add-album">Add</Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<IoPersonSharp />} id="profile-dropdown" className="ml-auto profile">
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
