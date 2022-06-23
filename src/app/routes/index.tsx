import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { HomePage, Login } from "../pages";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/pagina-inicial" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/pagina-inicial" />} />

            </Switch>
        </BrowserRouter>
    );
}