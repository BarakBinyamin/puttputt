// serialport library
// https://serialport.io/docs/api-bindings-cpp: change open options like parity bits 

const  SerialPort     = require('serialport')
const  ReadlineParser = require('@serialport/parser-readline')

const parser = new ReadlineParser({
    delimiter: '\n',
})

async function listAvailablePorts(){
    console.log("Available Ports:")
    const ports = await SerialPort.list()
    ports.forEach((port) => {
        console.log(`PATH: ${port.path} PID:${port.pnpId} Manufacturer:${port.manufacturer} `)
    })
}

async function setupPort(){
    const  port = new SerialPort({path: 'COM3',baudRate: 9600,autoOpen: false})

    await new Promise((resolve)=>{port.open((error) =>{if(error){process.exit(error)}resolve()})})

    port.pipe(parser)

    parser.on('data', (line)=>{
        console.log(`COM3 received: ${line}`)
        port.write('Thanks from COM3!\n')
    })

    parser.on('error', function (error) {
        console.log('COM3 error: ', error)
    })

    port.on('error', function (error) {
        console.log('COM3 error: ', error)
    })

    await new Promise((resolve)=>{
        console.log('Sending to COM4')
        port.write('Hello from COM3\n')
        resolve()
    })

}

async function main(){
    await setupPort()
}

main()