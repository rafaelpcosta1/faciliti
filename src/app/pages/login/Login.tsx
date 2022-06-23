import { useCallback, useMemo, useRef, useState } from "react";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    //Criando STATE = UseState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Criar useMemo para evitar um bloco de ser executado junto com os demais estados, Melhora performance
    const emailLength = useMemo(() => {
        return email.length * 1000;
    }, [email.length]);

    //Criando Funcões Arrow / Usando useCallback (Muito utilizado para guardar FUNÇÕES, melhora performance)
    const handleEntrar = useCallback(() => {
        console.log(email);
        console.log(password);
        if (inputPasswordRef.current !== null) {
            inputPasswordRef.current.focus();
        }
    }, [email, password]); //Importante colocar os states no Array de dependencias ao usar o useCallback, a não utilização do array pode trazer problemas.

    //retornando os elementos da pagina Login
    return (
        <div>
            <form>
                <p>Quantidade de caracteres no email: {emailLength} </p>

                <label>
                    <span>Email: </span>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' ? inputPasswordRef.current?.focus() : undefined}
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type="password"
                        value={password}
                        ref={inputPasswordRef}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleEntrar}>Entrar</button>
            </form>
        </div>
    );
}