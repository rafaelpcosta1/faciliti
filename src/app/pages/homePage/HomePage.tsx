import { useRef } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const counterRef = useRef({ counter: 0 });

    //Usando useRef para armazenar valores sem renderizar na tela
    return (
        <div>
            <p>Pagina Inicial</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Contar</button>
            <button onClick={() => console.log(counterRef.current.counter)}>Log</button>

            <Link to={"/login"}>Login</Link>
        </div>
    )
}