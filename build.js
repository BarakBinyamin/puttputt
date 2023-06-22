const {spawnSync, execSync } = require("node:child_process")
const fs                     = require('fs')

const NODE_VERSION = "node18"
const BACKEND_BASE = "index.js"
const BACKEND      = "index3"
const APPNAME      = "puttputt"

const PLATFORM     = process.platform
let   TAURI_SUFFIX = ""
let   TARGET       = ""
let   OUTPUT       = ""

async function check_dependencies(){
    const output = spawnSync('rustc', ['-Vv'])
    if (output.error){
        console.log("Missing Rust, install it from https://www.rust-lang.org/tools/install\n")
        process.exit()
    }
    else{
        TAURI_SUFFIX = output.stdout.toString().match('host.*')[0].replace(/.*: /,'')
    }
}

async function construct_build_paramaters(){
    let os = ""
    let ext= ""
    switch (PLATFORM){
        case 'darwin':
            os="mac"; break
        case 'linux':
            os="linux"; break
        case 'win32':
            os="win"; ext='.exe'; break
        default:
            console.log(`Platform ${PLATFORM} unsupported... exiting`)
            process.exit()
    }
    TARGET=`${NODE_VERSION}-${os}-${process.arch}`
    OUTPUT=`${BACKEND}-${TAURI_SUFFIX}${ext}`
}

async function build_local(){
    console.log("Building backend...")
    execSync(`npm install`, {stdio: 'inherit', cwd: 'backend'})
    execSync(`npx pkg ${BACKEND_BASE} --output ${OUTPUT} --targets ${TARGET}`, {stdio: 'inherit', cwd: 'backend'})
    console.log("Building app...")
    execSync(`npm install`, {stdio: 'inherit', cwd: 'view'})
    execSync(`npm install`, {stdio: 'inherit', cwd: 'tauri'})
    execSync(`npm run tauri build`, {stdio: 'inherit', cwd: 'tauri'})
    switch (PLATFORM){
        case 'darwin':
            fs.cpSync(`tauri/src-tauri/target/release/bundle/macos/${APPNAME}.app`,`./${APPNAME}.app/`,{recursive: true})
            fs.cpSync('tauri/node_modules/@serialport',`${APPNAME}.app/Contents/MacOS/@serialport`,{recursive: true})
            fs.cpSync(`${APPNAME}.app`, `/Applications/${APPNAME}.app`,{recursive: true})
            break
        case 'linux':
            os="linux"; break
        case 'win32':
            os="win"; ext='.exe'; break
        default:
            console.log(`FINISHED`)
    }
}

async function main(){
    await check_dependencies()
    await construct_build_paramaters()
    await build_local()
}

main()