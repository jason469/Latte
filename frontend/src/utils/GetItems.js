export async function GetItems({endpoint, setFunction, authTokens, logoutUser}) {
    let url = `${endpoint}/`;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()
    if (response.status >= 200 && response.status <= 299) {
        setFunction(data)
    } else if (response.statusText === 'Unauthorized') {
        logoutUser()
    }
}
