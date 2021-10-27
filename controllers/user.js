const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
        if (loggedUser) {
            const isValid = await loggedUser.validatePassword(password);
            if(isValid) {
                const token = loggedUser.generateAccessToken();
                return { token: token, userId: loggedUser.id }
            } else throw new Error("UNAUTHENTICATED");
        } else throw new Error("USER_NOTFOUND");
    } catch (error) {
        throw error;
    }    
}

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) 
            throw new Error("USER_NOTFOUND");
        return user;
    } catch(error) {
        throw error;
    }
}

const editUser = async (userId, loggedUserId, editedUserData) => {
    try {
        if (userId != loggedUserId) {
            throw new Error("UNAUTHORIZED");
        }  
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
