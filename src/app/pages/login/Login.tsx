import { useEffect, useMemo, useState } from "react";

export const Login = () => {
    //Criando STATE = UseState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Criar useMemo para evitar um bloco de ser executado junto com os demais estados, Melhora performance
    const emailLength = useMemo(() => {
        console.log('Executou');
        return email.length * 1000;
    }, [email.length]);

    //Criando Funcões Arrow
    const handleEntrar = () => {
        console.log(email);
        console.log(password);
    }

    //retornando os elementos da pagina Login
    return (
        <div>
            <form>
                <p>Quantidade de caracteres no email: {emailLength} </p>

                <label>
                    <span>Email: </span>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Senha: </span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="button" onClick={handleEntrar}>Entrar</button>
            </form>
        </div>
    );
}