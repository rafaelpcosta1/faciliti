import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <div>
            <p>Pagina Inicial</p>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}