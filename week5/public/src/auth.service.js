const AUTH_API = `${BASE_URL}/auth`;

const requestRegister = (data) => _post(`${AUTH_API}/register`, data);

const requestLogin = (data) => _post(`${AUTH_API}/login`, data);

const requestLogout = () => {
    clearStorage('isAuth');
    clearStorage('access_token');
    clearStorage('refresh_token');
}