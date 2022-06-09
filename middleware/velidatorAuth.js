const registerValidator = (user) => {
    const error = {}

    if (!user.name) {
        error.message = "Please Enter Your Name"
    } else if (user.name.length < 3) {
        error.message = "Name Must be at least 3 character"
    } else if (!user.email) {
        error.message = "Pleaser Enter Your Email"
    } else if (!user.password) {
        error.message = "Pleaser Enter Your Password"
    } else if (user.password.length < 4) {
        error.message = "Password Must be at least 4 character"
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}



const isEmail = (email) => {
    // symble check
    const checkHash = email.indexOf("#")
    const checkNot = email.indexOf("!")
    const checkPercent = email.indexOf("%")
    const checkQues = email.indexOf("?")

    const checkAdd = email.indexOf('@')
    const dot = email.indexOf('.')

    if (checkAdd < 2) {
        return false
    } else if (dot < 2) {
        return false
    } else if (checkAdd - 1 === dot || checkAdd + 1 === dot || checkAdd + 2 === dot || checkAdd + 3 === dot) { //4  7
        return false
    } else if (checkHash >= 0 || checkNot >= 0 || checkPercent >= 0 || checkQues >= 0) {
        return false
    } else {
        return true
    }

}


module.exports = isEmail;

module.exports = {
    registerValidator,
    isEmail
}