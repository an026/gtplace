const express = require("express")
const router = express.Router()
const {getCanvas, createCanvas, updateCanvas} = require("../controllers/canvas_controller")

router.get("/", getCanvas)

// make this a get request so i don't have to install postman
// router.get("/create", createCanvas)

router.post("/", updateCanvas)

module.exports = router