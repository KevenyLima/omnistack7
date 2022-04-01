const express = require('express')
const app = express()
const mongoose =  require('mongoose')
const router = require("./routes") 
const path = require('path')
const cors = require('cors')
//fazendo o socket io funcincionar em conjunto com o http e o express
const server = require('http').Server(app)
const io = require('socket.io')(server)
//fazendo com que todas as rotas tenham acesso ao websocket
app.use((req,res,next)=>{
    req.io = io 
    next()
})
app.use(cors())
app.use('/',router)
app.use('/files',express.static(path.resolve(__dirname,'../uploads/resized')))

mongoose.connect(`mongodb+srv://keveny:TaCIaQ5npuI1z7Uv@cluster0.2ugj7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
    server.listen(5000)
    console.log('rodadando')
})
