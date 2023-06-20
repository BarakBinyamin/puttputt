#!/bin/bash

# https://unix.stackexchange.com/questions/453385/shell-check-if-any-file-in-directory-has-changed
# https://unix.stackexchange.com/questions/691909/how-can-i-copy-all-files-while-excluding-files-with-a-certain-pattern

# dev
# build
# help

BUILD_DIR="none"
TAURI="tauri/"

check_dependencies(){
    results=`rustc -Vv`
    if [ $? -eq 0 ]; then
        BUILD_DIR=${TAURI}`rustc -Vv | grep host | sed "s/.*: //"`
    else
        printf "Missing Rust, install it from https://www.rust-lang.org/tools/install\n"
        exit 127
    fi
}
build(){
   if [ -d "$BUILD_DIR" ]; then 
        cd $BUILD_DIR && npm install && npm run tauri build
   fi
}
add_runtime_dependencies(){
    # macos --> target/release/bundle/macos/<appname>
    # add @serialport to target/release/bundle/macos/statusdashboard/Contents/MacOS
}
move_build_to_top_folder(){
    echo ""
}
clean(){
    find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
    find . -name 'target' -type d -prune -exec rm -rf '{}' +
    find . -name 'dist' -type d -prune -exec rm -rf '{}' +
}

check_dependencies
build




