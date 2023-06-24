# Backend
This is where the main functionality lives

The user interface talks to this program using normal [http requests](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Project Directory
| Name                                   | Purpose                                       | 
| :--                                    | :--                                           |
|[assets](assets)                        | A place to store sub-binaries                 |
|[tst](tst)                              | A place to store feature tests                |
|[index.js](index.js)                    | Main script for the backend                   |
|[package.json](package.json)            | Nodejs dependency management file             |

# Vercel pkg
This project uses [vercel pkg](https://github.com/vercel/pkg) to bundle javascript program & nodejs into an exectuable  
**Note**: The execuatable must be built for the OS it will run on

Format: `<node-version>-<OS>-<arch>` ex. node18-macos-x64

nodeRange: (node8), node10, node12, node14, node16 or latest  
platform: alpine, linux, linuxstatic, win, macos, (freebsd)  
arch: x64, arm64, (armv6, armv7)  

# Building other executables into the main binary
*Note: puttputt does not do this*

To test out this feature:
1. Move [tst/sub-binary-main.js](tst/sub-binary-main.js) into the backend dirctory
2. Compile [assets/hello.c](assets/hello.c) with make for mac, or gcc for linux
3. Add the follwing pkg stuff to the package.json
```json
...
"pkg":{
    "assets": ["./assets/<binary-name>"]
  }
...
```
4. build 
```bash
npx pkg sub-binary-main.js --targets node18-macos --config package.json --output subbinaryexample
```
5. run
```bash
./subbinaryexample
```

## Some notes on sub-binary stuff
Using the sub-binary in the main script is a little weird, during runtime the binary must be copied from virtual memory into real memory, theres a [stack overflow post about it](https://stackoverflow.com/questions/73210212/spawn-process-inside-process-or-detached-it-pkg-builder)  

Check out [sub-binary-main.js](sub-binary-main.js) for a tested example

It may be helpful to use debug mode when compiling:
```bash
npx pkg sub-binary-main.js --targets node18-macos --config package.json --debug --output subbinaryexample

DEBUG_PKG=1 && ./subbinaryexample  # activate debug mode
```
Also, you can compile c files on mac with:
```
make <filename-without-.c>
```

# References
- [Compiling for m1, code signing required](https://github.com/vercel/pkg-fetch/releases/tag/v3.1)
- [Pkg targets](https://github.com/vercel/pkg#targets)