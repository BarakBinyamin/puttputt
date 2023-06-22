#!/bin/bash
NODE_VERSION='node18'
TAURI_SUFFIX=`rustc -Vv | grep host | sed "s/.*: //"`
LOCALAPPDIR=""
EXTENSION=""
APPNAME="puttputt"
OUTPUT=""
TARGET=""
INPUT='index.js'
NAME="index3"
ARCH=`uname -m`
OS=`uname -s`

BUILD_DIR="tauri/"
BACKEND="backend/"

check_dependencies(){
    results=`rustc -Vv`
    if [ $? -eq 0 ]; then
        echo "Found Rust! but do you have nodejs?"
    else
        printf "Missing Rust, install it from https://www.rust-lang.org/tools/install\n"
        exit 127
    fi
    hasnode=`node --version`
    if [ $? -eq 0 ]; then
        echo "Found Nodejs! Going to next steps..."
    else
        printf "Missing Nodejs, install it from https://nodejs.org/en\n"
        exit 127
    fi
}

construct_target(){
    case $ARCH in
        x86_64*)   ARCH="x64"       ;;
        arm64*)    ARCH="arm64"     ;; 
        *)         echo "unknown architecture";exit ;;
    esac
    case $OS in
        Linux*)   OS="linux"     ;;
        Darwin*)  OS="mac"       ;; 
        Msys*)    OS="win"       ;;
        solaris*) echo "solaris";  exit ;;
        bsd*)     echo "bsd";       exit ;;
        *)        echo "unknown os";exit ;;
    esac
    TARGET="${NODE_VERSION}-${OS}-${ARCH}"
}
construct_output(){
    case $OS in
        win*)     EXTENSION=".exe" ;;
    esac
    OUTPUT="${NAME}-${TAURI_SUFFIX}${EXTENSION}"
}

build-local(){
    check_dependencies
    echo "Compiling backend..."
    cd $BACKEND && npm install
    construct_target 
    construct_output
    npx pkg $INPUT --output $OUTPUT --targets $TARGET
    if [ $? -eq 0 ]; then
        echo "Successfully compiled backend!"
    else
        printf "Failed to compile backend, exiting ..."
        exit 127
    fi
    
    echo "Compiling Desktop App..."
    cd ../view && npm install
    cd ../$BUILD_DIR && npm install && npm run tauri build
    
    case $OS in
        mac*)     LOCALAPPDIR="src-tauri/target/release/bundle/macos/${APPNAME}.app" ;;
        *)        echo "TODO";exit;;
    esac
    
    mv $LOCALAPPDIR ../
    cd ..

    echo "Adding runtime dependencies"
    case $OS in
        mac*)     cp -r $BUILD_DIR/node_modules/@serialport ./$APPNAME.app/Contents/MacOS;
                  echo  "Adding to applications folder";
                  mv ./$APPNAME.app /Applications;;
        *)        echo "TODO";exit;;
    esac
}

clean(){
    construct_target 
    construct_output
    rm -f $BACKEND/$OUTPUT
    rm -f tauri/src-tauri/Cargo.lock
    rm -f tauri/package-lock.json
    rm -f backend/package-lock.json
    rm -f view/package-lock.json
    find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
    find . -name 'target' -type d -prune -exec rm -rf '{}' +
    find . -name 'dist' -type d -prune -exec rm -rf '{}' +
}

# main(){
#     build-local
#     #build-release
# }