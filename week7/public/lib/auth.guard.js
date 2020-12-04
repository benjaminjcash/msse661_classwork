(() => {
    const loggedIn = authService._isLoggedIn();
    if(!loggedIn) {
        authService._logout();
    }
})();