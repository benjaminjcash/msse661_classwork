(() => {
    const loggedIn = storageHasData() ? getStorage("logged_in") : false;
    if(!loggedIn) {
        logout();
    }
})();