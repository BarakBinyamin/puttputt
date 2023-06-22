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
    const  port = new SerialPort( 'COM4', {baudRate: 9600,autoOpen: false})

    await new Promise((resolve)=>{
        port.open((error) =>{
            if(error){}resolve()
        })
    })

    port.pipe(parser)

    parser.on('data', (line)=>{
        console.log(`COM4 received: ${line}`)
        port.write('Got It! - COM4\n')
    })

    parser.on('error', function (error) {
        console.log('COM4 error: ', error)
    })

    port.on('error', function (error) {
        console.log('COM4 error: ', error)
    })

}

async function main(){
    await setupPort()
}

main()