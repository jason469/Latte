import Jumbotron from 'react-bootstrap/Jumbotron'
import {Container, ImageList} from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import {useContext, useEffect, useState} from "react";
import {ManageItems} from "../../utils/ManageItems";
import AuthContext from "../../contexts/AuthContext";
import EmptyPage from "../pages/website/EmptyPage";
import '../../App.css'
import classes from './Jumbotron.module.css'


function Jumbrotron() {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ManageItems({
            endpoint: '/api/get-random-images/',
            method: "GET",
            setFunction: setImages,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
        setLoading(true)
    }, [])

    switch (loading) {
        case true:
            return (
                <Jumbotron className={classes.jumbotron}>
                    <h1>Our favourite moments</h1>
                    <Container>
                        <Carousel
                            navButtonsProps={{
                                style: {
                                    backgroundColor: '#5F6368',
                                    borderRadius: 100
                                }
                            }}
                        >
                            {images.map(data =>
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_API_URL}/media/${data.fields.image}`}
                                    alt={"Image not found"}
                                    className={classes.jumbotron_image}
                                />
                            )}
                        </Carousel>
                    </Container>
                </Jumbotron>
            )
        case false:
            return (
                <EmptyPage/>
            )
    }
}


export default Jumbrotron;