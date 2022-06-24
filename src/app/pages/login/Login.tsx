import { useCallback, useMemo, useRef, useState } from "react";
import { useUsuarioLogado } from "../../shared/hooks";
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/InputLogin";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const { nomeDoUsuario } = useUsuarioLogado();

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
                <p>{nomeDoUsuario}</p>

                <InputLogin
                    label="Email: "
                    value={email}
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />

                <InputLogin
                    type="password"
                    label="Senha: "
                    value={password}
                    ref={inputPasswordRef}
                    onChange={newValue => setPassword(newValue)}
                />

                <ButtonLogin type="button" onClick={handleEntrar}>
                    Entrar
                </ButtonLogin>

                {/*<ButtonLogin type="button" onClick={handleEntrar} children={<>Cadastrar-se</>} />*/}
            </form>
        </div >
    );
}