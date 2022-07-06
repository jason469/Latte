import {createContext, useState} from "react";

const UpdateContext = createContext()
export default UpdateContext

export const UpdateProvider = props => {
    const [updatedImage, setUpdatedImage] = useState(0)
    const [updatedTag, setUpdatedTag] = useState(0)
    const [updatedAlbum, setUpdatedAlbum] = useState(0)

    let contextData = {
        updatedImage: updatedImage,
        setUpdatedImage: setUpdatedImage,
        updatedTag: updatedTag,
        setUpdatedTag: setUpdatedTag,
        updatedAlbum: updatedAlbum,
        setUpdatedAlbum: setUpdatedAlbum,
    }

    return (
        <UpdateContext.Provider value={contextData}>
            {props.children}
        </UpdateContext.Provider>
    );

}