import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface ITarefa {
   id: number;
   title: string;
   isCompleted: boolean;
}

const create = async (dataToCreate: Omit<ITarefa, 'id'>): Promise<ITarefa | ApiException> => {
   try {
      const { data } = await Api().post<any>('/tarefas', dataToCreate)
      return data;
   }
   catch (error: any) {
      return new ApiException(error.message || 'Erro ao incluir o registro.')
   }
};

const getAll = async (): Promise<ITarefa[] | ApiException> => {
   try {
      const { data } = await Api().get('/tarefas');
      return data;
   }
   catch (error: any) {
      return new ApiException(error.message || 'Erro ao buscar os registros.')
   }
};

const getById = async (id: number): Promise<ITarefa | ApiException> => {
   try {
      const { data } = await Api().get(`/tarefas/${id}`);
      return data;
   }
   catch (error: any) {
      return new ApiException(error.message || 'Erro ao buscar o registro.')
   }
};

const updateById = async (id: number, dataToUpdate: ITarefa): Promise<ITarefa | ApiException> => {
   try {
      const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
      return data;
   }
   catch (error: any) {
      return new ApiException(error.message || 'Erro ao alterar o registro.');
   }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
   try {
      await Api().delete(`/tarefas/${id}`);
      return undefined;
   }
   catch (error: any) {
      return new ApiException(error.message || 'Erro ao apagar o registro.')
   }
};

export const TarefasService = {
   create,
   getAll,
   getById,
   updateById,
   deleteById,
};