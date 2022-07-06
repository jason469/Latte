function inputHandler(e, setFunction) {
    let lowerCase = e.target.value.toLowerCase();
    setFunction(lowerCase);
    return null;
}

function filterData(inputText, listOfItems, filterImage = false) {
    return listOfItems.filter(item => {
        if (filterImage) {
            if (inputText === '' ||
                item.fields.name.toLowerCase().includes(inputText) ||
                item.fields.description.toLowerCase().includes(inputText)
            ) {
                return item;
            } else {
                return null
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
    })
}

export {inputHandler, filterData}