const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

const Game = require('./game.js')
const ipconfig = require('./ipconfig.js')
const port = 3000
const password = "wagamama"

let game = new Game(password)

app.get('/', (req, res) => {
    res.send(game.ping(req.query))
})

app.post('/', (req, res)=>{
    // res.json(req.body)
    res.json(game.process(req.body))
})

app.listen(port, () => {
    console.log(`App running on ${port}!`)
    console.log(ipconfig())
})