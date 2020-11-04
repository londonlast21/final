module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty';
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}

// make validator eventually to prevent double entry of medical providers
// module.exports.validatePostInput = (
//     name,
//     type,
//     location,
  
// ) => {
//     const errors = {};
//     if(name.trim() === ''){
//         errors.name = 'Provider name cannot be blank';
//     } else {

//     }
//     if(type.trim() === ''){
//         errors.type = 'Please add provider type';
//     }
//     if(location.trim() === ''){
//         errors.location = 'Please add provider location';
//     }

//     return {
//         errors,
//         valid: Object.keys(errors).length < 1
//     }
// }

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}