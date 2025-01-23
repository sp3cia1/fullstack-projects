const http = require('http')
const { WebSocketServer} = require('ws')

const url = require('url')
const uuidv4 = require("uuid").v4

const server = http.createServer()
const wsServer = new WebSocketServer( {server} )

const PORT = 8000

const connections = { }
const users = { }

const broadcast = () => { //to send the current updated state of users dictionary to every connection in connections.
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid]
        const message = JSON.stringify(users)
        connection.send(message)
    })
}

const handleMessage = (bytes, uuid) => {
    //client message = {"x":0, "y":100}
    //find the uuid in users and overwrite their state

    //even though we want send json from client we recieve bytes in websocket
    // console.log("bytes: ", bytes)
    const message = JSON.parse(bytes)
    // console.log(message)

    const user = users[uuid]
    user.state = message

    broadcast()

    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)

}

const handleClose = uuid => {
    console.log(`${users[uuid].username} dissconnected`)

    delete connections[uuid]
    delete users[uuid]

    broadcast()
}


wsServer.on('connection', (connection, request) => { //request is the initial http handshake. connection is the underlying websocket.
    //whenever a new connection is estabalished on our server this function runs for each user and every instance has their own uuid in their function closures.
    //we want the data to be same for every connection so "connectons" and "users" data structures are outside this function.
    // ws://localhost:8000?username=Alex
    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4(username)
    console.log(username)
    console.log(uuid)

    connections[uuid] = connection


    users[uuid] = {
        username,
        state: {
            x:0,
            y:0
        }
    }

    //on a users connection when a message occurs do this 
    connection.on("message", message => handleMessage(message, uuid))

    //on my connection if it closes do this
    connection.on("close",() => handleClose(uuid))
    //this uuid is associated with this instance of this connection so when this connection closes or when this user sends message this instance knows it was their uuid so they can pass it to handleMessage or handleClose with confidence and without any worry.

    //JSON.stringify(user) to send the current user info to other clients.
})

server.listen(PORT, () => {
    console.log(`websocket server is running on port ${PORT}`)
})