Vue.component("filter-component",{
    data:function(){
        return{
            buttonList:[
                { text:'全部',value:'all'},
                { text: '未完成', value: 'open' },
                { text: '完成', value: 'done' },
            ]
        }
    },
    template:`
        <p>
            <button 
                v-for="item of buttonList" 
                :key="item.text"
                @click="$emit('filter',item.value)"
            >{{item.text}}</button>
        </p>
    `
})

// 1. 外到內
Vue.component("InputComponent",{
    data:function(){
        return{
            compositionStatus: false,    // 輸入法狀態
        }
    },
    props:['value'], // 外面想用 v-model,props要接value
    template:`
        <p>
            <input type="text" 
            v-bind:value="value"
            v-on:input="$emit('input',$event.target.value)"
            @compositionstart="cstartHandler" 
            @compositionend="cendHandler"
            @keyup.enter="inputHandler">
        </p>
    `,
    methods:{
        cstartHandler() {
            this.compositionStatus = true
        },
        cendHandler() {
            this.compositionStatus = false
        },
        inputHandler() {
            if (this.compositionStatus) return false
            this.$emit("custom-input")
            // this.list.push({
            //     timestamp: new Date().getTime(),
            //     status: false,
            //     content: this.inputText.trim()
            // })
            // this.inputText = ""
        },
    }
})

// 2. 內到外
Vue.component("InputComponent2", {
    data: function () {
        return {
            compositionStatus: false,    // 輸入法狀態
            inputText:""
        }
    },
    template: `
        <p>
            <input type="text" 
            v-model="inputText"
            @compositionstart="cstartHandler" 
            @compositionend="cendHandler"
            @keyup.enter="inputHandler">
        </p>
    `,
    methods: {
        cstartHandler() {
            this.compositionStatus = true
        },
        cendHandler() {
            this.compositionStatus = false
        },
        inputHandler() {
            if (this.compositionStatus) return false
            this.$emit("custom-input", this.inputText)
            // this.list.push({
            //     timestamp: new Date().getTime(),
            //     status: false,
            //     content: this.inputText.trim()
            // })
            this.inputText = ""
        },
    }
})


new Vue({
    el: "#app",
    data: {
        inputText: "",              // 輸入文字
        list: [],                   // 所有資料
        show: "all",                // 顯示類型
        // compositionStatus:false,    // 輸入法狀態
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
        filterHandler(value){
            this.show = value
        },
        // cstartHandler(){
        //     this.compositionStatus = true
        // },
        // cendHandler(){
        //     this.compositionStatus = false
        // },
        // inputHandler() {
        //     if (this.compositionStatus) return false
        //     this.list.push({
        //         timestamp: new Date().getTime(),
        //         status: false,
        //         content: this.inputText.trim()
        //     })
        //     this.inputText = ""
        // },
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
        },
        inputHandler() {
            this.list.push({
                timestamp: new Date().getTime(),
                status: false,
                content: this.inputText.trim()
            })
            this.inputText = ""
        },
        inputHandler2(value) {
            this.list.push({
                timestamp: new Date().getTime(),
                status: false,
                content: value.trim()
            })
        },
        

    }
})
