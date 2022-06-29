import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import TagForm from "../../../utils/FormikForms/TagForm";
import TagLabel from "../../ui/tags/TagLabel";
import ImageLabel from "../../ui/images/ImageLabel";

function TagDetailPage() {
    const tagId = useParams().tagId
    const [currentTag, setCurrentTag] = useState({images: [], tag_data: {}})
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        ManageItems({
            endpoint: `${tagId}`,
            method: "GET",
            setFunction: setCurrentTag,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
        console.log(currentTag)
    }, [])

    return (
        <div>
            <TagForm
                title="Update tags"
                name={currentTag.tag_data.name}
                description={currentTag.tag_data.description}
                method='PATCH'
                endpoint={`${currentTag.tag_data.id}/`}
            />

            <strong>Images</strong>
            {currentTag.images.map(image => {
                return (
                    <ImageLabel data={image} key={image.id}/>
                )
            })}
        </div>
    )
}

export default TagDetailPage