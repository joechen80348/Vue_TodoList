Vue.component("filter-component", {
    data: function () {
        return {
            buttonList: [
                { text: '全部', value: 'all' },
                { text: '未完成', value: 'open' },
                { text: '完成', value: 'done' },
            ]
        }
    },
    template: `
        <p>
            <button 
                v-for="item of buttonList" 
                :key="item.text"
                @click="$emit('filter',item.value)"
            >{{item.text}}</button>
        </p>
    `
})

// 1. 外到內 資料內外交互傳遞
Vue.component("InputComponent", {
    data: function () {
        return {
            compositionStatus: false,    // 輸入法狀態
        }
    },
    props: ['value'], // props:接收外部資料用  ps:外面想用 v-model,props要接value
    template: `
        <p>
            <input type="text" 
            v-bind:value="value"
            v-on:input="$emit('input',$event.target.value)"
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
            this.$emit("custom-input")
        },
    }
})

// 2. 內到外 資料獨立控管
Vue.component("InputComponent2", {
    data: function () {
        return {
            compositionStatus: false,    // 輸入法狀態
            inputText: ""
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
            this.inputText = ""
        },
    }
})


// 1. 傳物件(示範) 2. 傳資料(建議使用)
Vue.component("list-item-component", {
    data: function () {
        return {
            editingText: "",            // 修改內容
        }
    },
    props: ["item", "editing"],
    template: `
        <li>
            <template v-if="editing === item">
                <input type="text" v-model="editingText">
                <button @click="completeHandler">完成</button>
                <button @click="cancelHandler">取消</button>
            </template>
            <template v-else>
                <input type="checkbox" v-model="status">{{item.content}}
                <button @click="editHandler(item)">修改</button>
                <button @click="deleteHandler(item)">刪除</button>
            </template>
        </li>
    `,
    computed: {
        status: {
            get() {
                return this.item.status
            },
            set(value) {
                this.$emit("change", this.item, value)
            }
        }
    },
    methods: {
        deleteHandler(item) {
            this.$emit("delete", item)
        },
        editHandler(item) {
            this.$emit("edit", item)
            this.editingText = item.content
        },
        completeHandler() {
            this.$emit("complate", this.editingText.trim())
            this.cancelHandler()
        },
        cancelHandler() {
            this.editingText = ""
            this.$emit("cancel")

        },
    }
})

new Vue({
    el: "#app",
    data: {
        inputText: "",              // 輸入文字
        list: [],                   // 所有資料
        show: "all",                // 顯示類型
        editing: null,              // 修改資料對象
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
        filterHandler(value) {
            this.show = value
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
        deleteHandler(item) {
            this.list = this.list.filter((target) => {
                return target != item
            })
        },
        editHandler(item) {
            this.editing = item
        },
        completeHandler(value) {
            this.editing.content = value
        },
        cancelHandler() {
            this.editing = null
        },
        changeHandler(item, value) {
            item.status = value
        }
    }
})
