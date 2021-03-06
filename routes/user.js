const express = require("express");
const { addUser, login, getUser, editUser } = require("../controllers/user");
const authjwt = require("../middlewares/auth");
const { registerationValidation, loginValidation } = require("../middlewares/userValidationSchema");
const validate = require("../middlewares/validation");
const router = express.Router();

/***  
 * for this task we should register, login, show details and edit the details of a user
   so POST - POST - GET - PATCH routes are needed
***/

router.route("/users")
    .post(registerationValidation, validate, registerUser)

router.route("/users/login")
    .post(loginValidation, validate, loginUser)
     
router.route("/users/:id")
    .get(getUserDetails)
    .patch(authjwt, editUserDetails)


// Routes Handlers
function registerUser (req, res, next) {
    const { body: newUserData } = req;
    addUser(newUserData)
    .then(result => res.status(201).json({
        message: "User registered",
        user: result
    }))
    .catch(error => next(error)); // pass the error to the global error handler
} 

function loginUser (req, res, next) {
    const { email, password } = req.body;
    login(email, password)
    .then(result => res.status(200).json({ 
        token: result.token,
        userId: result.userId 
    }))
    .catch(error => next(error));
}

function getUserDetails (req, res, next) {
    const { id: userId } = req.params;
    getUser(userId)
    .then(result => res.json({
        user: result
    }))
    .catch(error => next(error));
}

function editUserDetails (req, res, next) {
    const { id: userId } = req.params;
    const loggedUserId = req.userId;
    const { body: editedUserData } = req;
    editUser(userId, loggedUserId, editedUserData)
    .then(result => res.status(200).json({
        message: "User Edited",
        user: result
    }))
    .catch(error => next(error));
}



module.exports = router;
