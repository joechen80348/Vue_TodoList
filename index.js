new Vue({
    el: "#app",
    data: {
        inputText: "",              // 輸入文字
        list: [],                   // 所有資料
        show: "all",                // 顯示類型
        compositionStatus:false,    // 輸入法狀態
        editing:null,               // 修改資料對象
        editingText: "",            // 修改內容
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
                content: this.inputText.trim()
            })
            this.inputText = ""
        },
        deleteHandler(item){
            // 1. 第一種
            this.list = this.list.filter((target)=>{
                return target != item
            })

            // 2. 第二種
            //this.list.splice(index,1)
        },
        editHandler(item){
            this.editing = item
            this.editingText = item.content
        },
        completeHandler(){
            this.editing.content = this.editingText.trim()
            this.cancelHandler()
        },
        cancelHandler(){
            this.editingText = ""
            this.editing = null
        }

    }
})
