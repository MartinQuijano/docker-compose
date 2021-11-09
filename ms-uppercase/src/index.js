const express = require("express")
const http = require("http")
const app = express()
const PORT = process.env.PORT
const MSNUM_HOST = process.env.MSNUM_HOST
const MSNUM_PORT = parseInt(process.env.MSNUM_PORT)

app.get("/toUppercase", (req, res) => {
    var options = {
        host: MSNUM_HOST,
        port: MSNUM_PORT,
        path: '/word',
        method: 'GET',
        headers: req.headers
    }

    const wordreq = http.request(
        options,
        wordresp => {
            let result=""
            wordresp.on('error', function(e) {
                console.log('ERROR')
                console.log('Issue with request: ' + e.message)
            })
            wordresp.on('data', d => {
                console.log('SUCCESS')
                result+=d
            });
            wordresp.on('end', () => {
                var wordObj = JSON.parse(result)
                const output = '{"word": "'+ wordObj.word.toUpperCase() + '"}'
                res.status(200).send(output)
            })
        }
    )
    
    wordreq.end();

})

app.listen(PORT, () => {
    console.log("Microservice: word to uppercase")
})