import {useContext, useEffect, useState} from "react";
import AuthContext, {AuthProvider} from "../../../contexts/AuthContext";

import Pagination from "../../layout/Pagination";
import TagCard from "../../ui/TagCard";
import {GetItems} from "../../../utils/GetItems";
import EmptyPage from "../website/EmptyPage";

function ListOfTags() {
    const [tagData, setTagData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext)

    // Fetch current items
    const pull_tags = (tags) => {
        setCurrentItems(tags);
    }

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
                    <div className="tags">
                        {currentItems.map(item => <TagCard data={item}/>)}
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
