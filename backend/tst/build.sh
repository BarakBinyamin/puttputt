#!/bin/bash

NODE_VERSION='node18'
TAURI_SUFFIX=`rustc -Vv | grep host | sed "s/.*: //"`
EXTENSION=""
OUTPUT=""
TARGET=""
INPUT='index.js'
NAME="index3"
ARCH=`uname -m`
OS=`uname -s`

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

build(){
    npm install
    npx pkg $INPUT --output $OUTPUT --targets $TARGET
}

clean(){
    rm -rf node_modules
    rm $OUTPUT
}

construct_target
construct_output