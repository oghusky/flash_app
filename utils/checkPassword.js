exports.checkPassword = password => {
    const pwdMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    if (password === undefined || !password.match(pwdMatch)) {
        return false;
    };
    console.log(";) good to go")
    return true;
}