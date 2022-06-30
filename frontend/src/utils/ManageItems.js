export const ManageItems = async ({
                                      endpoint,
                                      method,
                                      authTokens,
                                      logoutUser,
                                      setFunction = null,
                                      body = null,
                                      content_type = "application/json"
                                  }) => {
    let url = `${endpoint}/`;
    if (content_type != null) {
        var response = await fetch(url, {
            method: `${method}`,
            headers: {
                'Content-Type': content_type,
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: body,
        })
    } else {
        var response = await fetch(url, {
            method: `${method}`,
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: body,
        })
    }

    if (response.statusText === 'Unauthorized') {
        logoutUser()
    } else if (response.status >= 200 && response.status <= 299) {
        if (setFunction) {
            let data = await response.json()
            setFunction(data)
        }
    }
    return response
}
