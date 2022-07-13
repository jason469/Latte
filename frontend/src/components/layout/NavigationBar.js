import './NavigationBar.module.css'
import {Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import {IoMdImages, IoMdPricetags, IoIosAlbums} from "react-icons/io";
import {FiLogOut} from "react-icons/fi";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import '../../App.css'
import classes from './NavigationBar.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import PersonIcon from '@mui/icons-material/Person';

function NavigationBar() {
    let {logoutUser} = useContext(AuthContext)
    const actions = [
        {
            icon:
                <NavDropdown.Item as={Link} to="/profile" className={classes.secondary_icon}>
                    <PersonIcon size={30} color="black"/>
                </NavDropdown.Item>,
            name: 'Profile'
        },
        {
            icon:
                <NavDropdown.Item onClick={() => logoutUser()} className={classes.secondary_icon}>
                    <FiLogOut/>
                </NavDropdown.Item>,
            name: 'Logout'
        },
    ];

    return (
        <Navbar bg="light" expand="lg" className={classes.navbar}>
            <div className={classes.main}>
                <Navbar.Brand as={Link} to="/" className="brand"><h3>Latte</h3></Navbar.Brand>
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
            </div>

            <div className={classes.secondary}>
                <SpeedDial
                    ariaLabel="Profile"
                    icon={
                    <SpeedDialIcon
                        openIcon={<RemoveIcon/>}
                    />}
                    direction="left"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                    <div className="outer-div"/>
                </SpeedDial>
            </div>

            {/*<NavDropdown title={<IoPersonSharp size={30} color="black" className="click"/>} id="profile-dropdown"*/}
            {/*             className="ml-auto profile" alignRight={true}>*/}
            {/*    <NavDropdown.Item as={Link} to="/profile">*/}
            {/*        Profile*/}
            {/*    </NavDropdown.Item>*/}
            {/*    <NavDropdown.Item onClick={() => logoutUser()}>*/}
            {/*        Logout*/}
            {/*    </NavDropdown.Item>*/}
            {/*</NavDropdown>*/}
        </Navbar>
    );
}

export default NavigationBar;
