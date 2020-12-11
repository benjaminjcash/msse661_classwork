(() => {
    let name = getStorage('name');
    document.getElementById("profile-name").innerHTML = `Welcome ${name}!`
})();