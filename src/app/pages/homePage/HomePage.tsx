import { useCallback, useState } from "react";

interface IListItem {
    title: string;
    isSelected: boolean;
}

export const HomePage = () => {
    const [lista, setLista] = useState<IListItem[]>([]);

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
                if (oldLista.some((listItem) => listItem.title === value)) return oldLista;

                return [
                    ...oldLista,
                    {
                        title: value,
                        isSelected: false,
                    }
                ];
            });
        }
    }, [])

    return (
        <div>
            <p>Lista</p>

            <input
                onKeyDown={handleInputKeyDown}
            />

            <h3>{lista.filter((listItem) => listItem.isSelected).length}</h3>

            <ul>
                {lista.map((listItem) => {
                    //Deve conter o key (Chave Unica para a lista, o React valida os elementos da lista, para garantir a performance deve ter essa key)
                    return <li key={listItem.title}>
                        <input
                            type="checkbox"
                            checked={listItem.isSelected}
                            onChange={() => {
                                setLista((oldLista) => {
                                    return oldLista.map(oldListItem => {
                                        const newIsSelected = (oldListItem.title === listItem.title) ? !oldListItem.isSelected : oldListItem.isSelected;
                                        return {
                                            ...oldListItem, //carregando todos os dados anterior da lista
                                            isSelected: newIsSelected,
                                        };
                                    });
                                });
                            }}
                        />
                        {listItem.title}
                    </li>
                })}
            </ul>
        </div>
    )
}