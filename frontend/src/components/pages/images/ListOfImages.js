import Pagination from "../../layout/Pagination";
import {useContext, useEffect, useState} from "react";
import ImageCard from "../../ui/images/ImageCard";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import EmptyPage from "../website/EmptyPage";
import TextField from "@mui/material/TextField";
import {filterData, inputHandler} from "../../../utils/searchBarFunctions";
import {AiFillPlusCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function ListOfImages() {
    const [imageData, setImageData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_images = images => setCurrentItems(images)
    const filteredData = filterData(inputText, imageData)
    const navigateToAdd = () => navigate(`/add-image`)

    //Fetch Images
    useEffect(() => {
        ManageItems({
            endpoint: 'images',
            method: "GET",
            setFunction: setImageData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [deletedItem])

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
                    <AiFillPlusCircle onClick={navigateToAdd}/>
                    <div className="list-of-items">
                        {inputText !== ""
                            ? filteredData.map(item => <ImageCard key={item.pk} data={item}
                                                                  setDeletedItem={setDeletedItem}/>)
                            : currentItems.map(item => <ImageCard key={item.pk} data={item}
                                                                  setDeletedItem={setDeletedItem}/>)
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
