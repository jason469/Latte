import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import TagForm from "../../../utils/FormikForms/TagForm";

function TagDetailPage() {
    const tagId = useParams().tagId
    const [currentTag, setCurrentTag] = useState({})
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        ManageItems({
            endpoint: `${tagId}`,
            method: "GET",
            setFunction: setCurrentTag,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    return (
        <div>
            <TagForm
                title="Update tags"
                name={currentTag.name}
                description={currentTag.description}
                method='PATCH'
                endpoint={`${currentTag.id}/`}
            />
        </div>
    )
}

export default TagDetailPage