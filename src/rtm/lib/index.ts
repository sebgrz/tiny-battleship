import expressApp from 'express'
import socket from "socket.io"
import http from "http"

const PORT = 5000

let srv = new http.Server(expressApp)
let io = new socket.Server(srv)

io.on("connection", c => {

})

srv.listen(PORT, () => {
    console.log(`realtime service is listening on ${PORT} port`)
})