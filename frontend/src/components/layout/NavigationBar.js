import './NavigationBar.module.css'
import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import {IoPersonSharp} from "react-icons/io5";
import {IoMdImages, IoMdPricetags, IoIosAlbums} from "react-icons/io";


function NavigationBar() {
    let {logoutUser} = useContext(AuthContext)

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/" className="brand">Latte</Navbar.Brand>
            <NavDropdown title={<IoMdImages size={35} color="black" className="click"/>} id="image-dropdown"
                         className="image">
                <NavDropdown.Item as={Link} to="/images">
                    All Images
                </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<IoMdPricetags size={30} color="black" className="click"/>} id="tag-dropdown"
                         className="tags">
                <NavDropdown.Item as={Link} to="/tags">
                    All Tags
                </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<IoIosAlbums size={30} color="black" className="click"/>} id="album-dropdown"
                         className="albums">
                <NavDropdown.Item as={Link} to="/albums">
                    All Albums
                </NavDropdown.Item>
            </NavDropdown>

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
