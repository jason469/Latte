import Pagination from "../../layout/Pagination";
import {useContext, useEffect, useState} from "react";
import ImageCard from "../../ui/ImageCard";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";
import EmptyPage from "../website/EmptyPage";

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

    switch (imageData.length !== 0) {
        case true:
            return (
                <div>
                    <div className="list-of-items">
                        {currentItems.map(item => <ImageCard key={item.id} data={item}/>)}
                    </div>
                    <Pagination
                        itemsPerPage={12}
                        data={imageData}
                        pull_function={pull_images}
                    />
                </div>
            )
        case false:
            return (
                <EmptyPage item="Images"/>
            )
    }
}

export default ListOfImages;
