const KEY = "rd_auth_ok";

export function isAuthed() {
    return localStorage.getItem(KEY) === "1";
}

export function setAuthed(v: boolean) {
    localStorage.setItem(KEY, v ? "1" : "0");
}

export function logout() {
    localStorage.removeItem(KEY);
}
