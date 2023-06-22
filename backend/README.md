# Backend
This is where the main functionality lives

The user interface can talk to this program using normal [http requests]() and [websockets]()

# Vercel pkg
This project uses [vercel pkg]() to bundle javascript program & nodejs into an exectuable  
**Note**: The execuatable must be built for the OS it will run on

Format: `<node-version>-<OS>-<arch>` ex. node18-macos-x64

nodeRange: (node8), node10, node12, node14, node16 or latest  
platform: alpine, linux, linuxstatic, win, macos, (freebsd)  
arch: x64, arm64, (armv6, armv7)  

# References
- [Compiling for m1, code signing required](https://github.com/vercel/pkg-fetch/releases/tag/v3.1)
- [Pkg targets](https://github.com/vercel/pkg#targets)