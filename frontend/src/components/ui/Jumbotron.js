import Jumbotron from 'react-bootstrap/Jumbotron'
import {Container} from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button} from '@mui/material'
import {useContext, useEffect, useState} from "react";
import {ManageItems} from "../../utils/ManageItems";
import AuthContext from "../../contexts/AuthContext";
import EmptyPage from "../pages/website/EmptyPage";


function Jumbrotron() {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        ManageItems({
            endpoint: '/images',
            method: "GET",
            setFunction: setImages,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
        setLoading(true)
    })

    switch (loading) {
        case true:
            return (
                <Jumbotron fluid>
                    <Container>
                        <h1>Our favourite moments</h1>
                        <Carousel>
                            {
                                images.map(data =>
                                    <img
                                        src={`http://localhost:9000/media/${data.fields.image}`}
                                        alt={"Image not found"}
                                        className="image-img"
                                        width={900}
                                        height={600}
                                    />)
                            }
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