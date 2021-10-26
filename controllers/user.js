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
        console.log("Is there anyone alive?");
        return await newUser.save();
    } catch (error) {
        //throw error;
    }
}

const login = async () => {

}

const getUser = async () => {

}

const editUser = async () => {

}

module.exports = {
    addUser,
    login,
    getUser,
    editUser,
}
