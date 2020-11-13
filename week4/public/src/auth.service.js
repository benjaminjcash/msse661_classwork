const base_url = 'http://localhost:3000/api';
const auth_api = `${base_url}/auth`;

function requestLogin(data) {
    return _post(`${auth_api}/login`, data);
}

function requestRegister(data) {
    return _post(`${auth_api}/register`, data); 
}