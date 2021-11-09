const express = require("express")
const http = require("http")
const app = express()
const PORT = process.env.PORT
const MSNUM_HOST = process.env.MSNUM_HOST
const MSNUM_PORT = parseInt(process.env.MSNUM_PORT)

app.get("/appendNumber", (req, res) => {
    var options = {
        host: MSNUM_HOST,
        port: MSNUM_PORT,
        path: '/toUppercase',
        method: 'GET',
        headers: req.headers
    }

    const wordreq = http.request(
        options,
        wordresp => {
            let result=""
            wordresp.on('error', function(e) {
                console.log('Issue with request: ' + e.message)
            })
            wordresp.on('data', d => {
                result+=d
            });
            wordresp.on('end', () => {
                const num = Math.floor((Math.random() * 100) + 1)
                var wordObj = JSON.parse(result)
                const wordPlusNum = wordObj.word + num
                const output = '{"word": "'+ wordPlusNum + '"}'
                res.status(200).send(output)
            })
        }
    )
    
    wordreq.end();

})

app.listen(PORT, () => {
    console.log("Microservice: random number picker")
})