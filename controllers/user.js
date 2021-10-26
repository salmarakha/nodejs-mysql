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
    try {
        const loggedUser = await User.findByEmail(email);
        console.log(loggedUser)
        if (loggedUser) {
            const isValid = await loggedUser.validatePassword(password);
            if(isValid) {
                // we should generate jwt but pass for now
                return "User is Valid";
            } else throw new Error("UNAUTHENTICATED");
        } else throw new Error("User not found");
    } catch (error) {
        throw error;
    }    
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
