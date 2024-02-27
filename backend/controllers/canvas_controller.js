const {getClient} = require("../db")

let client = getClient()
// getCanvas
const getCanvas = (request, response) => {

}

// createCanvas (just for setting up at first, won't use later on)
const createCanvas = async(request, response) => {
    let arr = new Array(64)
    for (let i = 0; i < arr.length; i++) {
        arr2 = new Array(64);
        for (let j = 0; j < arr2.length; j++) {
            arr2[j] = "FFFFFF"
        }
        arr[i] = arr2
    }
    await client.db("Canvas").collection("canvas").insertOne({
        canvas: arr
    })

    response.json({success: true})
}

// updateCanvas
const updateCanvas = (request, response) => {

}

module.exports = {
    getCanvas,
    createCanvas,
    updateCanvas
}