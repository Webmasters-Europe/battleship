const CONFIG = {
    port: 8081,
    ip: '127.0.0.1',
}

let clients = []

let map = [
    '...*****..',
    '..........',
    '..*...****',
    '..*.......',
    '..*.......',
    '..........',
    '.....*....',
    '.....*....',
    '***..*....',
    '.....*....',
]

let lastShotId = 1

const init = config => {
    const express = require('express')
    const http = require('http')
    const socketIo = require('socket.io')

    const app = express()

    app.use(express.static('public'))

    const webServer = http.Server(app)

    const io = socketIo(webServer)

    io.on('connection', socket => {
        manageConnections(io, socket)
        socket.on('disconnect', () => {
            disconnectSocket(socket)
        })
    })

    webServer.listen(config.port, 'localhost', () =>
        console.log(`server listening on port ${config.port}`),
    )

    webServer.listen(config.port, config.ip, () => {
        console.log(`Server running at http://${config.ip}:${config.port}/`)
    })
}

const startGame = io => {
    io.emit('setup', map)
    clients.forEach((player, i) => {
        player.socket.on('fire', pos => fireAtReq(pos, i))
    })
}

const disconnectSocket = socket => {
    clients = clients.filter(client => client.id !== socket.id)
    if (clients.length < 2) {
        clients.forEach(client => {
            client.socket.emit('reset')
        })
    }
}

const fireAtReq = (pos, clientId) => {
    if (
        (lastShotId === 1 && clientId === 1) ||
        (lastShotId === 0 && clientId === 0)
    ) {
        return
    }

    if (clientId === 0) {
        color = map.join('')[pos] === '*' ? 'red' : 'black'
        clients[0].socket.emit('hitAt', {
            position: pos,
            color: color,
            enemy: false,
        })
        clients[1].socket.emit('confirmFireAt', {
            position: pos,
            color: color,
            enemy: true,
        })
        lastShotId = 0
    }

    if (clientId === 1) {
        color = map.join('')[pos] === '*' ? 'red' : 'black'
        clients[1].socket.emit('hitAt', {
            position: pos,
            color: color,
            enemy: false,
        })
        clients[0].socket.emit('confirmFireAt', {
            position: pos,
            color: color,
            enemy: true,
        })
        lastShotId = 1
    }
}

const manageConnections = (io, socket) => {
    if (clients.length < 2) {
        clients.push({ socket: socket, id: socket.id })
        if (clients.length === 2) {
            startGame(io, clients)
        }
    }
}

init(CONFIG)
