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
    addUser()
    .then(result => res.status(201).json({
        message: "Uer registered",
        user: result
    }))
    .catch(error => next(err)); // pass the error to the global error handler
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
    getUser()
    .then(result => res.json({
        user: result
    }))
    .catch(error => next(error));
}

function editUserDetails (req, res, next) {
    editUser()
    .then(result => res.status(200).json({
        message: "User Edited",
        user: result
    }))
    .catch(error => next(error));
}



module.exports = router;
