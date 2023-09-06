const express = require('express')
const needle = require('needle')
const cheerio = require('cheerio')
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()



app.use( bodyParser.json() );
app.use(cors())


app.post("/api", (req, res) => {
    const url = req.body.url


    needle.get(encodeURI(url), function(err, response){
        if (err){
            console.error("Error fetching URL:", err)
            return
        }

        const $ = cheerio.load(response.body)
        const vid_url = $(`meta[property="og:video"]`).attr('content')

        if (!vid_url){
            console.error("Video URL not found")
            return
        }

        res.send(vid_url)

        })

    })




    app.get("/test", (req,res) => {
        res.send("hey")
    })


app.listen(5000, () => {console.log("Server Launched")})