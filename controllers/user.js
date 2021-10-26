const User = require("../models/user");

const addUser = async (newUserData) => {
    try{
        let newUser = new User(
            newUserData.firstname,
            newUserData.lastname,
            newUserData.email,
            newUserData.password,
            newUserData.phone,
            newUserData.dob
        );
        return await newUser.save();
    } catch (error) {
        next(error);
    }
}

const login = async () => {

}

const getUser = async (userId) => {
    try {
        return await User.findById(userId);
    } catch(error) {
        next(error);
    }
}

const editUser = async () => {

}

module.exports = {
    addUser,
    login,
    getUser,
    editUser,
}
