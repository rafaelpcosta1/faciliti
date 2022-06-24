import { useCallback, useState } from "react";

export const HomePage = () => {
    const [lista, setLista] = useState<string[]>(["Teste1", "Teste2", "Teste3"]);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {

            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value
            e.currentTarget.value = '';

            //Formas de atualizar a lista
            /*lista.push(e.currentTarget.value);
            setLista([...lista]);*/
            //setLista([...lista, e.currentTarget.value]);

            // Esse é o jeito certo
            setLista((oldLista) => {
                //Validar se o elemento existe na lista e não inserir o dado, utilizar o já existente 'includes'
                if (oldLista.includes(value)) return oldLista;

                return [...oldLista, value];
            });
        }
    }, [])

    return (
        <div>
            <p>Lista</p>

            <input
                onKeyDown={handleInputKeyDown}
            />

            <ul>
                {lista.map((value, index) => {
                    //Deve conter o key (Chave Unica para a lista, o React valida os elementos da lista, para garantir a performance deve ter essa key)
                    return <li key={value}>{value}</li>
                })}
            </ul>
        </div>
    )
}