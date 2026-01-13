import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { setAuthed } from "./auth";

const MOCK_LOGIN = "admin";
const MOCK_PASS = "123456709";

export function LoginPage() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const disabled = useMemo(() => !login.trim() || !pass.trim() || loading, [login, pass, loading]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setLoading(true);

        // мок-задержка, чтобы выглядело как запрос
        await new Promise((r) => setTimeout(r, 450));

        const ok = login.trim() === MOCK_LOGIN && pass === MOCK_PASS;
        if (!ok) {
            setAuthed(false);
            setErr("Неверный логин или пароль");
            setLoading(false);
            return;
        }

        setAuthed(true);
        navigate("/admin", { replace: true });
    }

    return (
        <div className="loginWrap">
            <div className="loginCard">
                <div className="loginHeader">
                    <h1 className="loginTitle">Вход в админ-панель</h1>
                    <p className="loginSubtitle">Введите логин и пароль</p>
                </div>

                <form className="rdForm" onSubmit={onSubmit}>
                    <div className="rdField">
                        <label className="rdLabel">Логин</label>
                        <div className="rdInputWrap">
                            <input
                                className="rdInput rdInputAnim"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="admin"
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="rdField">
                        <label className="rdLabel">Пароль</label>
                        <div className="rdInputWrap">
                            <input
                                className="rdInput rdInputAnim"
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="1234"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {err && <div className="loginError">{err}</div>}

                    <button className="rdBtnDark" type="submit" disabled={disabled}>
                        {loading ? "Проверяю..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
}
