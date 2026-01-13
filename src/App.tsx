import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/login-page/LoginPage";
import {AdminPage} from "./AdminPage.tsx";
import {RequireAuth} from "./pages/login-page/requireAuth.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/admin/*"
                element={
                    <RequireAuth>
                        <AdminPage />
                    </RequireAuth>
                }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
