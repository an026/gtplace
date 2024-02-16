const express = require("express")

const router = express.Router()

let counter = 0
router.get("/", (request, response) => {
    response.json({msg: "Counter: " + counter})
    counter+=1
})

module.exports = router