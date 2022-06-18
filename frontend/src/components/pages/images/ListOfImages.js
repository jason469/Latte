import classes from './ListOfImages.module.css'
import Pagination from "../../layout/Pagination";
import {useContext, useEffect, useState} from "react";
import ImageCard from "../../ui/ImageCard";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";

function ListOfImages() {
    const [imageData, setImageData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_images = (images) => {
        setCurrentItems(images);
    }

    //Fetch photos
    useEffect(() => {
        GetItems({
            endpoint: 'images',
            setFunction: setImageData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    return (
        <div>
            <div className={classes.images}>
                {currentItems.map(item => <ImageCard data={item}/>)}
            </div>
            <Pagination
                itemsPerPage={12}
                data={imageData}
                pull_function={pull_images}
            />
        </div>
    )
}

export default ListOfImages;
