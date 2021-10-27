require("dotenv").config();  // To set environment variables in .env file 
const fs = require("fs");

const express = require("express");
const app = express();

const userRoutes = require("./routes/user"); // this could be generalized

app.use(express.json());  // request's body parser; parse the body as json

app.use("/", userRoutes);

// Log errors
function logErrors (err, req) {
    /***
     *  Logging will take the format: 
        [date time] method: url Error: msg
     ***/ 
    const currentDate = new Date();
    const formatDateTime = 
        currentDate.getFullYear() + "-" +
        (currentDate.getMonth() + 1) + "-" +
        currentDate.getDate() + " " +
        currentDate.getHours() + ":" +
        currentDate.getMinutes() + ":" +
        currentDate.getSeconds();
    const log = `[${formatDateTime}] ${req.method}: ${req.url} ErrorMsg: ${err.message}`;
    
    // log errors to a text file
    fs.appendFile("errors_logs.txt", log + "\n", err => {
        if (err) {
          console.log(err);
        }
    });
    return log;
}

// Global error handler
app.use((err, req, res, next) => {
    // log errors to terminal and to a txt file
    console.log(logErrors (err, req));

    // handle errors TODO

    res.status(500).json({ 
        errorMessage: err.message, 
        errorCode: err.code 
    });
});

// Setup the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})