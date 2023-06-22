const {spawnSync} = require("node:child_process")
const fs = require('fs')

const NODE_VERSION = "node18"    // javscript runtime for pkg
const BACKEND_BASE = "index.js"  // input file to pkg
const BACKEND      = "index3"    // reference in tauri/src-tauri/tauri.conf.json
const APPNAME      = "puttputt"

const PLATFORM     = process.platform   // mac, linux, windows ect.
let   TAURI_SUFFIX = ""                 // tauri sidecar naming convention suffix
let   TARGET       = ""                 // pkg target os
let   OUTPUT       = ""                 // pkg output file name, follows tauri sidecar naming convention

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

async function clean(){
    await check_dependencies()
    await construct_build_paramaters()
    fs.rmSync(`backend/${OUTPUT}`,{force: true})
    fs.rmSync('tauri/src-tauri/Cargo.lock',{force: true})
    fs.rmSync('tauri/package-lock.json',{force: true})
    fs.rmSync('backend/package-lock.json',{ force: true})
    fs.rmSync('view/package-lock.json',{force: true})
    fs.rmSync('backend/node_modules',{recursive: true, force: true})
    fs.rmSync('tauri/node_modules',{recursive: true, force: true})
    fs.rmSync('view/node_modules',{recursive: true, force: true})
    fs.rmSync('tauri/src-tauri/target',{recursive: true, force: true})
    fs.rmSync('view/dist',{recursive: true, force: true})
}

clean()

