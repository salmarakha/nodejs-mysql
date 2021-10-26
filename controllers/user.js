const User = require("../models/user");

const addUser = async (newUserData) => {
    try{
        const newUser = new User(
            newUserData.firstname,
            newUserData.lastname,
            newUserData.email,
            newUserData.password,
            newUserData.phone,
            newUserData.dob
        );
        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

const login = async (email, password) => {

}

const getUser = async (userId) => {
    try {
        return await User.findById(userId);
    } catch(error) {
        throw error;
    }
}

const editUser = async (userId, editedUserData) => {
    try {
        return await User.findByIdAndUpdate(userId, editedUserData);
    } catch(error) {
        throw error;
    }
}

module.exports = {
    addUser,
    login,
    getUser,
    editUser,
}
