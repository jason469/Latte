import Pagination from "../../layout/Pagination";
import {useContext, useEffect, useState} from "react";
import ImageCard from "../../ui/ImageCard";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";
import EmptyPage from "../website/EmptyPage";
import TextField from "@mui/material/TextField";
import {inputHandler} from "../../../utils/searchBarFunctions";
import TagCard from "../../ui/TagCard";

function ListOfImages() {
    const [imageData, setImageData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");

    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_images = (images) => {
        setCurrentItems(images);
    }

    const filteredData = imageData.filter((image) => {
        if (inputText === '' ||
            image.name.toLowerCase().includes(inputText) ||
            image.description.toLowerCase().includes(inputText) ||
            image.tag.toLowerCase().includes(inputText) ||
            image.album.toLowerCase().includes(inputText)
        ){
            return image;
        } else {
            return null
        }
    })

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
                    <div className="search">
                        <TextField
                            id="image_search"
                            onChange={(e) => {
                                inputHandler(e, setInputText)
                            }}
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                    </div>
                    <div className="list-of-items">
                        {inputText !== ""
                            ? filteredData.map(item => <ImageCard key={item.id} data={item}/>)
                            : currentItems.map(item => <ImageCard key={item.id} data={item}/>)
                        }
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
