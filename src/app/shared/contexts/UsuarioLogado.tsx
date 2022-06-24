import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLogadoContextData {
   nomeDoUsuario: string;
   logout: () => void;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface UsuarioLogadoProviderProps {
   children: React.ReactNode;
}

export const UsuarioLogadoProvider: React.FC<UsuarioLogadoProviderProps> = ({ children }) => {
   //Inserindo o nome do usuario de forma automatizada, jeito certo
   const [nome, setNome] = useState('');

   useEffect(() => {
      setTimeout(() => {
         setNome('Roger');
      }, 1000);
   });

   //É recomendado que use o hook "useCallback" para compartilhar um contexto
   const handleLogout = useCallback(() => {
      console.log('Logout executado!')
   }, [])

   return (
      <UsuarioLogadoContext.Provider value={{ nomeDoUsuario: nome, logout: handleLogout }}>
         {children}
      </UsuarioLogadoContext.Provider>
   );
}