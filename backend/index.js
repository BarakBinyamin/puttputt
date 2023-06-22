const express     = require('express')
const cors        = require('cors')

const jsonTools   = express.json()
const app         = express()
const PORT        = 8000
const DELIMITER   = '\n'

app.use(cors())
app.use(jsonTools)
app.get('*', (req, res)=>{
  //console.log(Object.keys(req))  //check this out to see what top level stuff is in req
  res.send(`Server is up, but ${req.originalUrl} is not an available route`)
})

/* Setup websockets for live connection to UI */
const http                  = require('http')
const server                = http.createServer(app)
const { Server }            = require("socket.io")
const websockets            = new Server(server, {cors: {origin: '*'}})
websockets.events           = {'msg':'msg','info':'info','error':'error','init':'init'}

// Create relay for msgs to pass from UI to serial
websockets.on('connection', async (socket) => {  
  // Tell the local app what ports are avilable when it connects
  const serialports = await getAvailableSerialPorts()
  socket.emit(websockets.events.info, serialports)

  // From UI -> serial
  socket.on(websockets.events.msg, (msg)=>{
      sendMsgOverSerial(msg, socket)
  })
  // Intialize Port
  socket.on(websockets.events.init,(serial_port_info)=>{
      initSerialPort(serial_port_info, socket)
  })
})
/* End Setup websockets */

/* Serial Stuff */
const SerialPort     = require('serialport')
const ReadlineParser = require('@serialport/parser-readline')

async function getAvailableSerialPorts(){
    const  ports = await SerialPort.list()
    return ports
}

async function initSerialPort(serial_port_info, socket){
  if ("serial_port" in socket){
    await socket.serial_port.close()
  }
  const  serial_port = new SerialPort({ path: serial_port_info.path, baudRate: 9600, autoOpen: false})
  socket.serial_port = serial_port

  await new Promise((resolve)=>{
    serial_port.open((error) =>{
        console.log("Opening serial_port")
        if(error){
          console.error(error)
          socket.emit(websockets.events.error, error.toString())
        }
        resolve()
  })})

  const parser = new ReadlineParser({delimiter: DELIMITER})
  serial_port.pipe(parser)

  parser.on('data', (line)=>{
      console.log(`serialport received: ${line}`)
      socket.emit(websockets.events.msg, line)
  })

  parser.on('error', function (error) {
      console.log('parser error: ', error)
      socket.emit(websockets.events.error, error)
  })

  serial_port.on('error', function (error) {
      console.log('serialport error: ', error)
      socket.emit(websockets.events.error, error)
  })

}

async function sendMsgOverSerial(msg, socket){
   if (!("serial_port" in socket)){
      socket.emit(websockets.events.error,"serial_port is not configured")
      return
   }else{
      console.log(`Sending: ${msg}`)
      socket.serial_port.write(`${msg}\n`)
   }
}
/* End Serial Stuff */


server.listen(PORT, 'localhost', () => {
  console.log(`Serving backend on http://localhost:${PORT}`);
})

