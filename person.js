const Card = require('./card.js')

class Person{
    constructor(id, name){
        this.id = id
        this.name = name
        this.cards = []
    }
    
    queryCard(Q){
        for(var i=0; i<this.cards.length; i++){
            if(this.cards[i].equals(Q)){
                return {found: true, index: i}
            }
        }
        return {found:false}
    }

    removeCard(Q){
        var ret = this.queryCard(Q)
        if(ret.found){
            this.cards.splice(ret.index, 1)
            console.log("Deleted", Q, "from", this.id)
        }else{
            console.log(Q, "not found")
        }
    }
}

module.exports = Person
// let me = new Person('98203rj0y3rn0h', Card.getCards()[1])
// console.log(me)
// var Q = new Card('2', 'hearts')
// me.removeCard(Q)
