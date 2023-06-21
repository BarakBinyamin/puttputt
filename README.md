# puttputt
A cross platform serial client

## Usage
### Mac 
1. Download the [latest prebuilt release](https://github.com/BarakBinyamin/puttputt/releases/download/mint/statusdashboard_0.0.0_x64.dmg), and [@seralport library](https://github.com/BarakBinyamin/puttputt/releases/download/mint/@serialport-macx86.zip)
2. Double click on the dmg, when the installer that pops up, move the app into the applications directory
3. Navigate to the applications directory in finder, `ctrl+click` the app and select **show package contents**, unzip @serialport in the Contents/MacOS sub-folder
4. Navigate back to the applications directory in finder, `ctrl+click` the app, select **open**, then select **open** again once a prompt comes up
5. Serach for the app anytime with `cmd+spacebar`

### Built & Tested on
- Vmare vm of ubuntu-20.04-focal on Windows 10 x86_64
- Windows 10 x86_64
- Macbook pro x86_64

## Description
Puttputt is a cross platform serial client. It was developed as an example of how to build a cross platform application for desktop

## Development
### Dependencies & Setup
### Dev
### Build

## Technologies
- <img text-align="center" src="https://tauri.app/meta/favicon-144x144.png" height="20px"/> [Tauri](https://tauri.app/)  a multi-platform  application build tool
- <img text-align="center" src="https://nodejs.org//static/images/favicons/favicon.png" height="20px"/> [Nodejs](https://nodejs.org/en) a native javascript runtime used to develop the **backend**
- <img text-align="center" src="https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png" height="20px"/> [Vercel pkg](https://www.npmjs.com/package/pkg) packages nodejs scripts with a runtime as an executable
- <img text-align="center" src="https://vuejs.org/logo.svg" height="20px"/>  [Vue](https://vuejs.org/) a view-model javascript framework, used to develop the **user interface**
- <img text-align="center" src="https://vitejs.dev/logo.svg" height="20px"/> [Vite](https://vitejs.dev/) a development, minification & website build tool

# Resources
- [rs422 reference](https://stackoverflow.com/questions/67905013/node-serialport-not-receiving-data)
- [mac run anyway](https://www.lifewire.com/fix-developer-cannot-be-verified-error-5183898)