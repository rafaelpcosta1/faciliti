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

            //Validar se o elemento existe na lista e não inserir o dado, utilizar o já existente 'includes'
            if (lista.some((listItem) => listItem.title === value)) return;

            TarefasService.create({ title: value, isCompleted: false })
                .then((result) => {
                    if (result instanceof ApiException) { }
                    else {
                        // Esse é o jeito certo
                        setLista((oldLista) => [...oldLista, result]);
                    }
                });
        }
    }, [lista])

    const handleToggleComplete = useCallback((id: number) => {

        const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id);
        if (!tarefaToUpdate) return;

        TarefasService.updateById(id, {
            ...tarefaToUpdate,
            isCompleted: !tarefaToUpdate.isCompleted,
        })
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message)
                }
                else {
                    setLista((oldLista) => {
                        return oldLista.map((oldListItem) => {

                            if (oldListItem.id === id) return result;
                            return oldListItem;
                        });
                    });
                }
            });

    }, [lista]);

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
                            onChange={() => handleToggleComplete(listItem.id)}
                        />
                        {listItem.title}
                    </li>
                })}
            </ul>
        </div>
    )
}