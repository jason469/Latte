function inputHandler(e, setFunction) {
    let lowerCase = e.target.value.toLowerCase();
    setFunction(lowerCase);
    return null;
}

function filterData(inputText ,listOfItems) {
    let filteredItems = listOfItems.filter(item => {
        if (inputText === '' ||
            item.name.toLowerCase().includes(inputText) ||
            item.description.toLowerCase().includes(inputText)
        ) {
            return item;
        } else {
            return null
        }
    })

    return filteredItems
}

export {inputHandler, filterData}