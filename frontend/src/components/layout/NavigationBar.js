import './NavigationBar.module.css'
import {Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import ImageIcon from '@mui/icons-material/Image';
import LoyaltyRoundedIcon from '@mui/icons-material/LoyaltyRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import {FiLogOut} from "react-icons/fi";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import '../../App.css'
import classes from './NavigationBar.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import PersonIcon from '@mui/icons-material/Person';


function NavigationBar() {
    let {logoutUser} = useContext(AuthContext)
    const left_actions = [
        {
            icon:
                <Nav.Link id="image-dropdown" className="image" to="/images" as={Link}>
                    <ImageIcon className="click"/>
                </Nav.Link>,
            name: 'Images'
        },
        {
            icon:
                <Nav.Link id="tag-dropdown" className="tags" to="/tags" as={Link}>
                    <LoyaltyRoundedIcon className="click"/>
                </Nav.Link>,
            name: 'Tags'
        },
        {
            icon:
                <Nav.Link id="album-dropdown" className="albums" as={Link} to="/albums">
                    <PhotoLibraryRoundedIcon className="click"/>
                </Nav.Link>,
            name: 'Albums'
        },
    ]
    const right_actions = [
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
        <Navbar expand="lg" className={classes.navbar}>
            <div className={classes.main}>
                <div className={`click ${classes.brand}`}>
                    <SpeedDial
                        ariaLabel="Brand"
                        FabProps={{
                            sx: {
                                bgcolor: 'transparent',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    animation: "none"
                                },
                                '&:click': {
                                    bgcolor: 'transparent',
                                    animation: "none"
                                },
                                boxShadow: "0",
                                textTransform: "capitalize",
                            }
                        }}
                        icon={
                            <Navbar.Brand
                                as={Link}
                                to="/"
                                className="brand-logo"
                                expand={"lg"}
                            >
                                Latte
                            </Navbar.Brand>
                        }
                        direction="right"
                        className="brand"
                    >
                        {left_actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                        <div className="outer-div"/>
                    </SpeedDial>
                </div>
            </div>

            <div className={classes.secondary}>
                <SpeedDial
                    ariaLabel="Profile"
                    style={{color: "#F2D4D1"}}
                    icon={
                        <SpeedDialIcon
                            openIcon={<RemoveIcon/>}
                        />}
                    direction="left"
                    FabProps={{
                        sx: {
                            bgcolor: 'transparent',
                            '&:hover': {
                                bgcolor: 'transparent',
                                animation: "none"
                            },
                            boxShadow: "0"
                        }
                    }}
                >
                    {right_actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                    <div className="outer-div"/>
                </SpeedDial>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
