const USER_API = `${BASE_URL}/user`;

class ProfileAPIService {
    /**
     * Updates profile information
     */
    updateProfile = (user) => _put(`${USER_API}/update/me`, user);
}

const profileAPIService = new ProfileAPIService();