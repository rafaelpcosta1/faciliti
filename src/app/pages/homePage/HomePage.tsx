import { useRef } from "react";
import { Link } from "react-router-dom";
import { useUsuarioLogado } from "../../shared/hooks";

export const HomePage = () => {
    const counterRef = useRef({ counter: 0 });

    //Passando Contexto para pagina inicial do sistema.
    const { nomeDoUsuario, logout } = useUsuarioLogado();

    //Usando useRef para armazenar valores sem renderizar na tela
    return (
        <div>
            <p>Pagina Inicial</p>

            <p>{nomeDoUsuario}</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Contar</button>
            <button onClick={() => console.log(counterRef.current.counter)}>Log</button>
            <button onClick={logout}>Logout</button>

            <Link to={"/login"}>Login</Link>
        </div>
    )
}