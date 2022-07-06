import {createContext, useState} from "react";

const UpdateContext = createContext()
export default UpdateContext

export const UpdateProvider = props => {
    const [updatedItem, setUpdatedItem] = useState(0)

    let contextData = {
        updatedItem: updatedItem,
        setUpdatedItem: setUpdatedItem,
    }

    return (
        <UpdateContext.Provider value={contextData}>
            {props.children}
        </UpdateContext.Provider>
    );

}