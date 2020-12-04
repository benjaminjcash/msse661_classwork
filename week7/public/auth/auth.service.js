/**
 * @class AuthService
 * Service for the auth component
 */
class AuthService {
    authAPIService;

    constructor(authAPIService) {
        this.authAPIService = authAPIService;
    }

    /**
     * Logs a user in.
     * @param {Object} event 
     */
    _login = async (e) => {
        e.preventDefault();
        const username = document.getElementById('usernameLogin').value;
        const password = document.getElementById('passwordLogin').value;
        
        try {
            const res = await authAPIService.login({ username, password });
            if(res.success) {
                setStorage('access_token', res.access_token);
                setStorage('refresh_token', res.refresh_token);
                setStorage('logged_in', true);
                alert(res.message);
                window.location.href = '/item/item.html';
            } else {
                alert(res.error);
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    /**
     * Registers a new user.
     * @param {Object} event 
     */
    _register = async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('usernameRegister').value;
        const password = document.getElementById('passwordRegister').value;
    
        try {
            const res = await authAPIService.register({ name, email, username, password });
            if(res.success) {
                console.log(res);
                alert(res.message);
                window.location.href = '/';
            } else {
                console.log(res);
                alert(res.error);
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    /**
     * Logs a user out.
     * @param {Object} event 
     */
    _logout = async (e) => {
        e.preventDefault();
        try {
            await authAPIService.logout();
            window.location.href = '/';
        }
        catch(err) {
            console.error(err);
        }
    }

    /**
     * Checks if a user is logged in.
     */
    _isLoggedIn = () => {
        return storageHasData() ? getStorage("logged_in") : false;
    }
}

const authService = new AuthService(authAPIService);





