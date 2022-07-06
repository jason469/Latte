import './NavigationBar.module.css'
import {Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import {IoPersonSharp} from "react-icons/io5";
import {IoMdImages, IoMdPricetags, IoIosAlbums} from "react-icons/io";
import '../../App.css'


function NavigationBar() {
    let {logoutUser} = useContext(AuthContext)

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/" className="brand">Latte</Navbar.Brand>
            <Nav.Item>
                <Nav.Link id="image-dropdown" className="image" to="/images" as={Link}>
                    <IoMdImages size={35} color="black" className="click"/>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link id="tag-dropdown" className="tags" to="/tags" as={Link}>
                    <IoMdPricetags size={30} color="black" className="click"/>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link id="album-dropdown" className="albums" as={Link} to="/albums">
                    <IoIosAlbums size={30} color="black" className="click"/>
                </Nav.Link>
            </Nav.Item>

            <NavDropdown title={<IoPersonSharp size={30} color="black" className="click"/>} id="profile-dropdown"
                         className="ml-auto profile" alignRight={true}>
                <NavDropdown.Item as={Link} to="/profile">
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => logoutUser()}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    );
}

export default NavigationBar;
