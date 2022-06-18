export async function GetItems({endpoint, setFunction, authTokens, logoutUser}) {
    let url = `http://localhost:9000/api/${endpoint}/`;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()
    if (response.status === 200) {
        setFunction(data)
    } else if (response.statusText === 'Unauthorized') {
        logoutUser()
    }
}
