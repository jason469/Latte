import {useEffect, useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {ManageItems} from "../../../utils/ManageItems";
import TagForm from "../../../utils/FormikForms/TagForm";
import ImageLabel from "../../ui/images/ImageLabel";
import {useParams} from "react-router-dom";
import '../../../App.css'


function TagDetailPage(props) {
    const [currentTag, setCurrentTag] = useState({images: [], tag_data: {}})
    let {authTokens, logoutUser} = useContext(AuthContext)

    let {tagId} = useParams();
    if (!tagId) tagId = props.tagId;

    useEffect(() => {
        ManageItems({
            endpoint: `/tags/${tagId}`,
            method: "GET",
            setFunction: setCurrentTag,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [tagId])

    return (
        <div>
            <TagForm
                title="Update tags"
                name={currentTag.tag_data.name}
                description={currentTag.tag_data.description}
                method='PATCH'
                endpoint={`/tags/${currentTag.tag_data.id}`}
            />

            <strong>Images</strong>
            <div className="labels">
                {currentTag.images.map(image => {
                    return (
                        <ImageLabel data={image} key={image.id}/>
                    )
                })}
            </div>
        </div>
    )
}

export default TagDetailPage