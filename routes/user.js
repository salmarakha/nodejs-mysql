const express = require("express");
const router = express.Router();

/***  
 * for this task we should register, login, show details and edit the details of a user
   so POST - POST - GET - PATCH routes are needed
***/

router.route("/users")
    .get(getAllusers) // no need for it will delete it later



module.exports = router;
