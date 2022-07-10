import Jumbotron from 'react-bootstrap/Jumbotron'
import {Container, ImageList} from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import {useContext, useEffect, useState} from "react";
import {ManageItems} from "../../utils/ManageItems";
import AuthContext from "../../contexts/AuthContext";
import EmptyPage from "../pages/website/EmptyPage";
import '../../App.css'
import './Jumbotron.css'


function Jumbrotron() {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ManageItems({
            endpoint: '/get-random-images/',
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
                <Jumbotron>
                    <div className="title">Our favourite moments</div>
                    <Container className="jumbotron_container">
                        <Carousel
                            navButtonsProps={{
                                style: {
                                    backgroundColor: 'cornflowerblue',
                                    borderRadius: 100
                                }
                            }}
                        >
                            {images.map(data =>
                                <img
                                    src={`http://localhost:9000/media/${data.fields.image}`}
                                    alt={"Image not found"}
                                    className="jumbotron_image"
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