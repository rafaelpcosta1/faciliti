import { useCallback, useEffect, useState } from "react";
import { ApiException } from "../../shared/services/api/ApiException";
import { ITarefa, TarefasService } from '../../shared/services/api/tarefas/TarefasService';

export const HomePage = () => {
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
        TarefasService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                }
                else {
                    setLista(result);
                }
            });
    }, []);

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
                        isCompleted: false,
                        id: oldLista.length,
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

            <h3>{lista.filter((listItem) => listItem.isCompleted).length}</h3>

            <ul>
                {lista.map((listItem) => {
                    //Deve conter o key (Chave Unica para a lista, o React valida os elementos da lista, para garantir a performance deve ter essa key)
                    return <li key={listItem.id}>
                        <input
                            type="checkbox"
                            checked={listItem.isCompleted}
                            onChange={() => {
                                setLista((oldLista) => {
                                    return oldLista.map(oldListItem => {
                                        const newIsCompleted = (oldListItem.title === listItem.title) ? !oldListItem.isCompleted : oldListItem.isCompleted;
                                        return {
                                            ...oldListItem, //carregando todos os dados anterior da lista
                                            isCompleted: newIsCompleted,
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