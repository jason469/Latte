import {useState, useEffect, createContext} from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();
export default AuthContext

export const AuthProvider = props => {

    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ?
            JSON.parse(localStorage.getItem('authTokens')) :
            null)
    let [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ?
            jwtDecode(localStorage.getItem('authTokens')) :
            null)
    let [loading, setLoading] = useState(true)
    let [validUser, setValidUser] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(`/auth/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.elements.username.value,
                "password": e.target.elements.password.value
            })
        })
        let data = await response.json()
        if (response.status >= 200 && response.status <= 300) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            setValidUser(false)
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        if (authTokens !== null) {
            let response = await fetch(`/auth/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "refresh": authTokens?.refresh
                })
            })
            let data = await response.json()

            if (response.status >= 200 && response.status <= 300) {
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            }
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        authTokens: authTokens,
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        validUser: validUser
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : props.children}
        </AuthContext.Provider>
    );
};

