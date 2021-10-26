const express = require("express");
const { addUser, login, getUser, editUser } = require("../controllers/user");
const router = express.Router();

/***  
 * for this task we should register, login, show details and edit the details of a user
   so POST - POST - GET - PATCH routes are needed
***/

router.route("/users")
    .post(registerUser)

router.route("/users/login")
    .post(loginUser)
     
router.route("/users/:id")
    .get(getUserDetails)
    .patch(editUserDetails)


// Routes Handlers
function registerUser (req, res, next) {
    const { body: newUserData } = req;
    addUser(newUserData)
    .then(result => res.status(201).json({
        message: "User registered",
        user: result[0]
    }))
    .catch(error => next(error)); // pass the error to the global error handler
} 

function loginUser (req, res, next) {
    login()
    .then(result => res.status(200).json({
        message: "User logged-in successfully",
        user: result
    }))
    .catch(error => next(error));
}

function getUserDetails (req, res, next) {
    const { id: userId } = req.params;
    getUser(userId)
    .then(result => res.json({
        user: result[0]
    }))
    .catch(error => next(error));
}

function editUserDetails (req, res, next) {
    const { id: userId } = req.params;
    editUser(userId)
    .then(result => res.status(200).json({
        message: "User Edited",
        user: result
    }))
    .catch(error => next(error));
}



module.exports = router;
