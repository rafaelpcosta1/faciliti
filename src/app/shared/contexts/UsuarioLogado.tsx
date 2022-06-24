import { createContext, useCallback } from "react";

interface IUsuarioLogadoContextData {
   nomeDoUsuario: string;
   logout: () => void;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface UsuarioLogadoProviderProps {
   children: React.ReactNode;
}

export const UsuarioLogadoProvider: React.FC<UsuarioLogadoProviderProps> = ({ children }) => {
   //É recomendado que use o hook "useCallback" para compartilhar um contexto
   const handleLogout = useCallback(() => {
      console.log('Logout executado!')
   }, [])

   return (
      <UsuarioLogadoContext.Provider value={{ nomeDoUsuario: 'Leandro', logout: handleLogout }}>
         {children}
      </UsuarioLogadoContext.Provider>
   );
}