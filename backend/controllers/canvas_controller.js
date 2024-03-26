const { ObjectId, Timestamp } = require("mongodb");
const {getClient} = require("../db")

let client = getClient()

const canvasId = "65dc1f5d03cd3a8febbf567d";
const timeDelayBetweenPlacing = 60; // 60 seconds for now
// getCanvas
const getCanvas = async(request, response) => {
    const canvasCursor = client.db("Canvas").collection("canvas").find(
        {_id: new ObjectId(canvasId)}
    )
    const canvasDocuments = await canvasCursor.toArray()
    response.json({canvas: canvasDocuments[0].canvas, success: true})
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
const updateCanvas = async (request, response) => {
    try {
        const email = request.body.email
        console.log(request.body)
        // Check for user in database
        const userCursor = client.db("Users").collection("userinfo").find({email: email})
        const emailDocuments = await userCursor.toArray();
        let canPlace = false
        if (emailDocuments.length == 0) {
            await client.db("Users").collection("userinfo").insertOne({
                email: email,
                lastTimePlaced: new Date()
            })
            canPlace = true
            response.json({placed: true})
        } else {
            const document = emailDocuments[0]
            console.log("before")
            const timeDiffSeconds = ((new Date()) - document.lastTimePlaced) / 1000
            console.log("after")
            console.log(timeDiffSeconds)
            await client.db("Users").collection("userinfo").updateOne({email: email}, {$set: {lastTimePlaced: new Date()}})
            // Can Place
            if (timeDiffSeconds >= timeDelayBetweenPlacing) {
                response.json({placed: true})
            } else {
                response.json({placed: false})
            }
        }
    } catch (error) {
        console.log(error.message)
        response.json({error: error})
    }
}

module.exports = {
    getCanvas,
    createCanvas,
    updateCanvas
}