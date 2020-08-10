const exprees =  require('express')
const app = exprees()

const http = require('http').createServer(app)
const PORT =  process.env.PORT || 3000

http.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`)
})

app.use(exprees.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send('hello anurag')
    res.sendFile(__dirname + '/index.html')
})


// socket 
const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log('connected......')

    socket.on('message', (msg)=>{

        socket.broadcast.emit('message', msg)
    })
})