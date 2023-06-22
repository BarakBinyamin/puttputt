<template>
    <select @change="init" v-model="path">
        <option v-for="pathname in paths" 
        :value="pathname">{{pathname}}</option>
    </select>
    <input @keyup.enter="sendit" v-model="msg" autocomplete="off" 
    autocorrect="off" autocapitalize="off" spellcheck="false"/>
    <div class="button" @click="sendit">Submit message</div>    
    <p v-for="item in msgs">{{ item.from }}: {{ item.msg }}</p>
</template>

<script>
import { io } from "socket.io-client"

export default{
    data(){
        return {
            info : "goober",
            paths: [],
            path: "",
            msg: "",
            socket: "",
            msgs:[]
        }
    },
    async mounted(){
        console.log("subsrcibe requested")
        const socketio = io("http://localhost:8000")
        this.socket    = socketio
        socketio.on("info", (info)=>{
            this.paths=info.map(item=>item.path)
        })
        socketio.on("error", (error)=>{
            alert(error)
        })
        socketio.on("msg", (msg)=>{
            this.msgs.push(
                {
                    "from": "them",
                    "msg": msg
                }
            )
        })
    },
    methods:{
        async init(event){
            this.socket.emit("init", {"path": this.path})
        },
        async sendit(event){
            this.socket.emit("msg", this.msg)
            this.msgs.push(
                {
                    "from": "me",
                    "msg": this.msg
                }
            )
            this.msg = ""
        }
    },
}
</script>

<style scoped>
.button{
    background: grey;
    width: max-content;
    padding: 3px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px;
    display: inline-block;
}
.button:hover{
    opacity: .8;
    cursor: pointer;
}
</style>