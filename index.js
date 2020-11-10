new Vue({
    el: "#app",
    data: {
        inputText: "",
        list: [],
        show: "all",
        compositionStatus:false,
        editing:null,
        editingText: "",
    },
    computed: {
        filterList() {
            if (this.show === "all") {
                return this.list
            } else if (this.show === "open") {
                return this.list.filter((item) => { return item.status === false })
            } else if (this.show === "done") {
                return this.list.filter((item) => { return item.status === true })
            }
        }
    },
    methods: {
        cstartHandler(){
            this.compositionStatus = true
        },
        cendHandler(){
            this.compositionStatus = false
        },
        inputHandler() {
            if (this.compositionStatus) return false
            this.list.push({
                timestamp: new Date().getTime(),
                status: false,
                content: this.inputText
            })
            this.inputText = ""
        },
        deleteHandler(index){
            // 1. 第一種
            // this.list = this.list.filter((item,i)=>{
            //     return i != index
            // })

            // 2. 第二種
            this.list.splice(index,1)
        },
        editHandler(item){
            this.editing = item
            this.editingText = item.content
        },
        completeHandler(){
            this.editing.content= this.editingText
            this.cancelHandler()
        },
        cancelHandler(){
            this.editingText = ""
            this.editing = null
        }

    }
})
