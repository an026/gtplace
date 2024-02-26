const express = require("express")
const {getClient} = require("../server")
const router = express.Router()

const client = getClient()
let counter = 0
router.get("/", (request, response) => {
    response.json({msg: "Counter: " + counter})
    counter+=1
})

module.exports = router