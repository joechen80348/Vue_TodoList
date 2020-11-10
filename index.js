new Vue({
    el: "#app",
    data: {
        inputText: "",
        list: [],
        show: "all",
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
        inputHandler() {
            this.list.push({
                timestamp: new Date().getTime(),
                status: false,
                content: this.inputText
            })
            this.inputText = ""
        }
    }
})
