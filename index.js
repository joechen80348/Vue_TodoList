new Vue({
    el:"#app",
    data:{
        inputText:"",
        list:[],
    },
    computed:{

    },
    methods:{
        inputHandler(){
            this.list.push({
                timestamp: new Date().getTime(),
                status: false,
                content: this.inputText
            })
            this.inputText = ""
        }
    }
})
