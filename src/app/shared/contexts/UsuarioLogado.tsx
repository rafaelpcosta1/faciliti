import { createContext } from "react";

interface IUsuarioLogadoContextData {
   nomeDoUsuario: string;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface UsuarioLogadoProviderProps {
   children: React.ReactNode;
}

export const UsuarioLogadoProvider: React.FC<UsuarioLogadoProviderProps> = ({ children }) => {
   return (
      <UsuarioLogadoContext.Provider value={{ nomeDoUsuario: 'Leandro' }}>
         {children}
      </UsuarioLogadoContext.Provider>
   );
}