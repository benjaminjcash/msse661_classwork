const login = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    requestLogin({
        username: username,
        password: password
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        if(data.success) {
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

const register = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    requestRegister({
        name: name,
        email: email,
        username: username,
        password: password
    }).then(function(res) {
        return res.json()
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