export enum ROUTES {
    ANYWHERE = "/*",
    PRINCIPAL = "/",
    REGISTER = "/register",
    CONFIRMED_ACCOUNT = "/account-confirm/*",
    LOGIN = "/login",
    HOME = "/home"
}

export enum ApiRoutes {
    USERS = "/users/",
    TODO = "/todo/",
    REGISTER = "/register/",
    LOGIN = "/api/token/",
    REFRESH = "/api/token/refresh/",
    SESSION_USER = "/session-user/",
    ACCOUNT_CONFIRM = "/account-confirm/",
    LOGOUT = "api/logout/",
}