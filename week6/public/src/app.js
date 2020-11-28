const login = (e) => {
    e.preventDefault();
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;
    requestLogin({
        username: username,
        password: password
    }).then(function(data) {
        if(data.success) {
            console.log(data);
            setStorage('access_token', data.access_token);
            setStorage('refresh_token', data.refresh_token);
            setStorage('logged_in', true);
            alert(data.message);
            window.location.href = 'home.html';
        } else {
            alert(data.error);
        }
    })
    .catch(function(error) {
        console.log(error);
    })
}

const register = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('usernameRegister').value;
    const password = document.getElementById('passwordRegister').value;
    requestRegister({
        name: name,
        email: email,
        username: username,
        password: password
    }).then(function(data) {
        console.log(data);
        if(data.success) {
            alert(data.message);
            window.location.href = '/';
        } else {
            alert(data.error);
        }
    })
    .catch(function(error) {
        console.log(error);
    })
}

const logout = (e) => {
    requestLogout();
    window.location.href = '/';
}