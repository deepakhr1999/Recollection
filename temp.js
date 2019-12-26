class Test{
    constructor(){
        this.state = 42
    }
    getState(){
        return this.state
    }
}

let t = new Test()
console.log(t["getState"]())