import { createApp } from "vue"
import App from "./App.vue"

import { Command }   from '@tauri-apps/api/shell'

// alternatively, use `window.__TAURI__.shell.Command`
// `binaries/my-sidecar` is the EXACT value specified on `tauri.conf.json > tauri > bundle > externalBin`
const command = Command.sidecar('../../../backend/index3')
const output  = command.spawn()
console.log(output)

createApp(App).mount("#app")
