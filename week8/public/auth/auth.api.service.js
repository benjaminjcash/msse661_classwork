const AUTH_API = `${BASE_URL}/auth`;

class AuthAPIService {
    /**
     * Registers a new user.
     * @param {Object} formData { name, email, username, password } 
     */
    register = (formData) => _post(`${AUTH_API}/register`, formData);

    /**
     * Logs in a user.
     * @param {Object} formData { username, password} 
     */
    login = (formData) => _post(`${AUTH_API}/login`, formData);

    /**
     * Logs out a user.
     */
    logout = () => {
        clearStorage('logged_in');
        clearStorage('access_token');
        clearStorage('refresh_token');
        clearStorage('name');
        window.lo
    }

}

const authAPIService = new AuthAPIService();