import {useNavigate} from "react-router-dom";

export function Navigate(url) {
    const navigate = useNavigate();
    navigate(url)
    return null
}