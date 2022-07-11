function inputHandler(e, setFunction) {
    let lowerCase = e.target.value.toLowerCase();
    setFunction(lowerCase);
    return null;
}

function filterData(inputText, listOfItems, filterImage = false, criteria = null) {
    return listOfItems.filter(item => {
            if (filterImage) {
                switch (criteria) {
                    case "album":
                        for (let album of item.fields.album) {
                            if (album.name.toLowerCase().includes(inputText)) {
                                return item;
                            }
                        }
                        break

                    case "tag":
                        for (let tag of item.fields.tag) {
                            if (tag.name.toLowerCase().includes(inputText)) {
                                return item;
                            }
                        }
                        break

                    case "desc":
                        if (item.fields.description.toLowerCase().includes(inputText)) {
                            return item;
                        }
                        break

                    default:
                        if (item.fields.name.toLowerCase().includes(inputText)) {
                            return item;
                        }
                        break
                }
            } else {
                if (inputText === '' ||
                    item.name.toLowerCase().includes(inputText) ||
                    item.description.toLowerCase().includes(inputText)
                ) {
                    return item;
                } else {
                    return null
                }
            }
        }
    )
}

export {inputHandler, filterData}