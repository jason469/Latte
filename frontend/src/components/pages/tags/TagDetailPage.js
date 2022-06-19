import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";

function TagDetailPage() {
    const tagId = useParams().tagId
    const [currentTag, setCurrentTag] = useState({})
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        GetItems({
            endpoint: `${tagId}`,
            setFunction: setCurrentTag,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    return (
        <div>
            <h3>{currentTag.name}</h3>
            <p>{currentTag.description}</p>
        </div>
    )
}

export default TagDetailPage