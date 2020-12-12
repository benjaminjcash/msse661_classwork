const getFormValues = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const current_password = document.getElementById("current_password").value;
    const new_password = document.getElementById("new_password").value;
    return { name, email, username, current_password, new_password };
}

const validate = () => {
    const values = getFormValues();
    if(!values.current_password) {
        alert("you must enter your current password to update any profile information")
        resetForm();
        return [false, values];
    } else {
        return [true, values];
    }
    
}

const resetForm = () => {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("username").value = '';
    document.getElementById("current_password").value = '';
    document.getElementById("new_password").value = '';
}

const saveChanges = async (e) => {
    e.preventDefault();

    const [valid, values] = validate();
    if(!valid) return;

    try {
        const response = await profileAPIService.updateProfile(values);
        if(response.success) {
            alert("updated profile successfully");
            resetForm();
        } else {
            alert(response.message);
        }
    }
    catch(err) {
        console.error(err);
        resetForm();
    }
}