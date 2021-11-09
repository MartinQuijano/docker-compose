const express = require("express")
const app = express()
const PORT = process.env.PORT

app.get('/word', function(req, res){
    var words = ['docker', 'composer', 'kubernetes', 'microservice', 'web', 'frontend', 'backend', 'graphql', 'git', 'nosql']
    var index = Math.floor(Math.random()*10)
    var wordPickedAsJson = '{"word": "'+words[index]+ '"}';

    res.writeHead(200, {
        "Content-Type":"application/json"
    })
    res.end(wordPickedAsJson)
})

app.listen(PORT, () => {
    console.log("Microservice: random word picker")
})