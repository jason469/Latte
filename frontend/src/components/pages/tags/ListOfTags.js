import {useContext, useEffect, useRef, useState} from "react";
import AuthContext, {AuthProvider} from "../../../contexts/AuthContext";
import TextField from "@mui/material/TextField";

import Pagination from "../../layout/Pagination";
import {ManageItems} from "../../../utils/ManageItems";
import EmptyPage from "../website/EmptyPage";
import {filterData, inputHandler} from "../../../utils/searchBarFunctions"
import TagCard from "../../ui/tags/TagCard";
import {AiFillPlusCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {ImageList} from "@mui/material";

function ListOfTags() {
    const [tagData, setTagData] = useState([])
    const [deletedItem, setDeletedItem] = useState(0)
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    let {authTokens, logoutUser} = useContext(AuthContext)

    const pull_tags = tags => setCurrentItems(tags);

    const filteredData = filterData(inputText, tagData)
    const navigateToAdd = () => navigate(`/add-tag`)

    //Fetch tags
    useEffect(() => {
        ManageItems({
            endpoint: 'tags',
            method: "GET",
            setFunction: setTagData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [deletedItem])


    switch (tagData.length !== 0) {
        case true:
            return (
                <div>
                    <div className="search">
                        <TextField
                            id="tag_search"
                            onChange={(e) => {
                                inputHandler(e, setInputText)
                            }}
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                    </div>
                    <AiFillPlusCircle className="click" onClick={navigateToAdd}/>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {inputText !== ""
                            ? filteredData.map(item => <TagCard key={item.id} data={item}
                                                                setDeletedItem={setDeletedItem}/>)
                            : currentItems.map(item => <TagCard key={item.id} data={item}
                                                                setDeletedItem={setDeletedItem}/>)
                        }
                    </ImageList>
                    <Pagination
                        itemsPerPage={12}
                        data={tagData}
                        pull_function={pull_tags}
                    />
                </div>
            )
        case false:
            return (
                <EmptyPage item="Tags"/>
            )
    }
}

export default ListOfTags;
