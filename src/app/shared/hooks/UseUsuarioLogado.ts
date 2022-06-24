//Criando hook customizado
import { useContext } from "react"
import { UsuarioLogadoContext } from "../contexts"

//O que faz essa função ser um HOOK é ter outro Hook do React dentro dela.
//É uma funçaõ que usa um React Hook dentro dela e tenha no inicio do nome a palavra "use"
export const useUsuarioLogado = () => {
   const context = useContext(UsuarioLogadoContext)
   return context;

   //Pode usar assim tbm, pq ele so vai devolver o contexto
   //return useContext(UsuarioLogadoContext);
}