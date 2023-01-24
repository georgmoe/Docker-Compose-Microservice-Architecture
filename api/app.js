const express = require("express");
const cors = require("cors")

const port = process.env.PORT
const shortener_host = process.env.SHORTENER_HOST
const shortener_port = process.env.SHORTENER_PORT

const app = express();
app.use(express.json())
app.use(cors())

app.post("/shortener", async (req, res) => {
    try{
        const url = req.body.url
        console.log(url)
        console.log(shortener_host + shortener_port)
        const response = await fetch(`http://${shortener}:${shortener_port}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url: url})
        })
        const data = await response.json()
        console.log(data)
        const shortenedUrl = data.url
        console.log(shortenedUrl)
        res.json({url: shortenedUrl})
    } catch (err){
        res.json({error: err.stack})
    }
})

app.get("*", async (req, res) => {
    try{
        const path = req.body.path
        const response = await fetch(`http://${shortener}:${shortener_port}/${path}`)
        const data = await response.json()
        const redirectUrl = data.redirect
        console.log(redirectUrl)
        res.redirect(redirectUrl)
    } catch (err){
        res.json({error: err.stack})
    }
})

app.listen(port, () => console.log(`api listening at http://0.0.0.0:${port}`));
