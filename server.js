const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
    // handeling new users
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    // getting message data
    socket.on('send-chat-message', message => {
        // seding message to every other client on the server
        socket.broadcast.emit('chat-message', {name: users[socket.id], message: message})
    })

    // handeling left users
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})