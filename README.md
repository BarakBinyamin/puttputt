# puttputt
A cross platform desktop app example. It's a basic serial client

Tested on x86_64: Ubuntu 20.04, MacOS Monterey, Windows 10

- [Usage](#usage)
    - [Mac](#mac)
    - [Ubuntu](#ubuntu)
    - [Windows](#windows)
- [Developers info](#development)
    - [Project Directory](#project-directory)
    - [Requirements](#requirements)
    - [Dev](#dev)
    - [Custom Build & Deployment](#deployment)
- [Technologies](#technologies)
- [Motivation](#motivation)
- [Resources](#resources)

## Usage
### Mac 
1. Download the [latest prebuilt release](https://github.com/BarakBinyamin/puttputt/releases/download/mint/statusdashboard_0.0.0_x64.dmg), and [@seralport library](https://github.com/BarakBinyamin/puttputt/releases/download/mint/@serialport-macx86.zip)
2. Double click on the dmg, when the installer that pops up, move the app into the applications directory
3. Navigate to the applications directory in finder, `ctrl+click` the app and select **show package contents**, unzip @serialport in the Contents/MacOS sub-folder
4. Navigate back to the applications directory in finder, `ctrl+click` the app, select **open**, then select **open** again once a prompt comes up
5. Search for the app anytime with `cmd+spacebar`

If your USB isn't showing up in the dropdown you might need to...
#TODO
### Windows
1. Download the [latest prebuilt release]()
2. Unzip it
3. Open up the directory and double click "puttputt" to run

### Build it yourself
Follow the [development requirements](#requirements) and skip to [deployment](#deployment)

##  Development
### Project Directory
| Name                                   | Purpose                                       | 
| :--                                    | :--                                           |
|[backend](backend)                      | Most of the functionality behind this project |
|[tauri](tauri)                          | Used to compile the app for desktop           |
|[view](view)                            | Where the UI is developed                     |   
|[build.js](build.js)                    | Automated build script                        |
|[clean.js](clean.js)                    | Automated cleanup script                      |
|[package.json](package.json)            | Nodejs dependency management file             |
|[.gitignore](.gitignore)                | List of files & folders for git to ignore     |

### Requirements
- Download [Nodejs](https://nodejs.org/en)
- Download [rustc](https://www.rust-lang.org/tools/install)

Clone the repo
```bash
git clone https://github.com/BarakBinyamin/puttputt.git && cd puttputt
```

For Ubuntu/linux install some more dependencies:
```bash
# todo
```

### Dev
Run `npm install` in the folders **view**, **tauri**, and **backend** and then
```bash
cd tauri
npm run tauri dev
```
A cool native window should pop up, edit [view/src/App.vue](view/src/App.vue) to see realtime updates

### Deployment
From main project directory run the follwing command, it should take a while...
```bash
node build.js
```
The app should either be in a new app sub-directory or on mac available through search: "cmd+space"+"puttputt"

If you want you can clear up the build files run:
```bash
node clean.js
```

## Motivation
Puttputt was developed to learn how to build a native desktop UI for the top platforms

Tauri + nodejs + pkg + vue + vite enables:
- Faster development
- Admin free App download and usage

Inspired by [@perfect7m/taurine](https://github.com/Perfect7M/taurine)

## Technologies
- <img text-align="center" src="https://tauri.app/meta/favicon-144x144.png" height="20px"/> [Tauri](https://tauri.app/)  a multi-platform  application build tool
- <img text-align="center" src="https://nodejs.org//static/images/favicons/favicon.png" height="20px"/> [Nodejs](https://nodejs.org/en) a native javascript runtime used to develop the **backend**
- <img text-align="center" src="https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png" height="20px"/> [Vercel pkg](https://www.npmjs.com/package/pkg) packages nodejs scripts with a runtime as an executable
- <img text-align="center" src="https://vuejs.org/logo.svg" height="20px"/>  [Vue](https://vuejs.org/) a view-model javascript framework, used to develop the **user interface**
- <img text-align="center" src="https://vitejs.dev/logo.svg" height="20px"/> [Vite](https://vitejs.dev/) a development, minification & website build tool

# Resources
- [rs422 reference](https://stackoverflow.com/questions/67905013/node-serialport-not-receiving-data)
- [mac run anyway](https://www.lifewire.com/fix-developer-cannot-be-verified-error-5183898)
- https://unix.stackexchange.com/questions/453385/shell-check-if-any-file-in-directory-has-changed
- https://unix.stackexchange.com/questions/691909/how-can-i-copy-all-files-while-excluding-files-with-a-certain-pattern
