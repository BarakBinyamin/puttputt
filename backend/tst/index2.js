const {execSync, spawn} = require('child_process')
const path              = require('path')
const fs                = require('fs')
const os                = require('os')

// executable file name
const executable = 'hello'

//file path to the asset executable file
const remoteControlFilePath = path.join(__dirname, `/assets/${executable}`)
let executableFileFullPath  = remoteControlFilePath;
let tmpfolder               = ""           

// avoid the workaround if the parent process in not pkg-ed version.
if (process.pkg) {
  // creating a temporary folder for our executable file
  tmpfolder      = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`)
  const destinationPath        = path.join(tmpfolder, executable)
  executableFileFullPath = destinationPath
  // copy the executable file into the temporary folder
  fs.copyFileSync(remoteControlFilePath, destinationPath);

  // on Linux systems you need to manually make the file executable
  execSync(`chmod +x ${destinationPath}`);
}



// Run executableFileFullPath
const child = spawn(executableFileFullPath)
// Listen to std out events
child.stdout.on('data', async (data) => {
    console.log(`${data}`)
    await new Promise(((res)=>{setTimeout(res,3000)}))
})





async function signalHandler(){
  if (fs.existsSync(tmpfolder)){
    console.log(`\nCleaning up...\n\tRemoving ${tmpfolder}`)
    fs.rmdirSync(tmpfolder, {recursive: true})
  }
  process.exit()
}

process.on('SIGINT',  signalHandler)
process.on('SIGTERM', signalHandler)
process.on('SIGQUIT', signalHandler)
process.on('exit'   , signalHandler)