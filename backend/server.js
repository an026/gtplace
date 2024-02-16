// IMPORTS
require("dotenv").config({path: "./.env"})
const express = require("express")

// ROUTE FILES
const testRoutes = require("./routes/test")

// create express app
const app = express()


// MIDDLEWARE

/**
 * This just prints the endpoint path (i.e., / or /endpoint) and the type of request (GET, POST, etc...)
 */
app.use((request, response, next) => {
    console.log(request.path, request.method)
    next() // every time I setup some middleware listener (.use or like .get or .post etc...), I need to either return a response, or call the next(), otherwise this function never resolves
})


// this line and the test.js file are just for testing, remove and replace these later
app.use("/api/test", testRoutes)

// Starts the server
app.listen(process.env.PORT, () => {
    console.log("Server started on port: " + process.env.PORT)
})