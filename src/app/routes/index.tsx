import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { InitPage } from "../pages";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/pagina-inicial" element={<InitPage />} />

                <Route path="*" element={<Navigate to="/pagina-inicial" />} />

            </Switch>
        </BrowserRouter>
    );
}