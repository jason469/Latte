import {useContext, useEffect, useState} from "react";
import AuthContext, {AuthProvider} from "../../../contexts/AuthContext";
import TextField from "@mui/material/TextField";

import Pagination from "../../layout/Pagination";
import TagCard from "../../ui/TagCard";
import {GetItems} from "../../../utils/GetItems";
import EmptyPage from "../website/EmptyPage";
import {inputHandler} from "../../../utils/searchBarFunctions"

function ListOfTags() {
    const [tagData, setTagData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [inputText, setInputText] = useState("");
    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_tags = (tags) => {
        setCurrentItems(tags);
    }

    const filteredData = tagData.filter(tag => {
        if (inputText === '' ||
            tag.name.toLowerCase().includes(inputText) ||
            tag.description.toLowerCase().includes(inputText)
        ){
            return tag;
        } else {
            return null
        }
    })

    //Fetch tags
    useEffect(() => {
        GetItems({
            endpoint: 'tags',
            setFunction: setTagData,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])


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
                    <div className="list-of-items">
                        {inputText !== ""
                            ? filteredData.map(item => <TagCard key={item.id} data={item}/>)
                            : currentItems.map(item => <TagCard key={item.id} data={item}/>)
                        }
                    </div>
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
