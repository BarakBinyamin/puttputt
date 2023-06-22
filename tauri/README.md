# Tauri
Cross-platfrom build folders, each folder corrosponds to a working environment

An app can only be built on the platform it can run on

## Sidecar naming convention
A sidecar is a way to call binaries to run alongside an app

Binaries must have the naming format <name>-<rust envionment>
where name is refernced in src-tauri/tauri.conf.json, while <rust envionment> can
be found with the command `rustc -Vv | grep host | sed "s/.*: //"`