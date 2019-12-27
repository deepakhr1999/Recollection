const Card = require('./card.js')

class Person{
    constructor(id, name){
        this.id = id
        this.name = name
        this.cards = []
    }
    
    queryCard(Q){
        console.log("QUery called")
        for(var i=0; i<this.cards.length; i++){
            for(var j=0; j<this.cards[i].length; j++){
                if(this.cards[i][j].equals(Q)){
                    return {found: true, index:[i, j]}
                }
            }
        }
        return {found:false}
    }

    removeCard(Q){
        var ret = this.queryCard(Q)
        if(ret.found){
            let [i, j] = ret.index 
            this.cards[i].splice(j, 1)
            console.log("Deleted", Q, "from", this.id)
        }else{
            console.log(Q, "not found")
        }
        return ret.found
    }
}

module.exports = Person
// let me = new Person('98203rj0y3rn0h', "deepak")
// me.cards = Card.getCards()[1]
// me.cards.forEach(l=>console.log(l))
// var Q = new Card('10', 'hearts')
// me.removeCard(Q)
