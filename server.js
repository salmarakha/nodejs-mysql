require("dotenv").config();  // To set environment variables in .env file 

const express = require("express");
const app = express();

app.use(express.json());  // request's body parser; parse the body as json


// Global error handler
app.use((err, req, res, next) => {
    // maybe I should log the errors to a txt file here TODO
    console.log(err);

    res.status(500).json({ message: "Something went wrong!" });
});

// Setup the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})