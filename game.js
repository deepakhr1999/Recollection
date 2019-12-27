const Person = require('./person.js')
const Card = require('./card.js')
class Game{
    constructor(password){
        this.password = password
        this.players = []
        this.state = 0
        this.broadcast = "Game init"
        this.id = "hellothere"
    }
    process(request){ // request {password, command, params}
        // console.log(request)
        if(this.password != request.password)
            return {
                status: 'failed',
                notes: 'authentication failure'
            }
        console.log(`${request.command} was called with params\n${JSON.stringify(request.params)}\n`)
        if(typeof this[request.command] === "function")
            return this[request.command](request.params)
    }

    isInGame(id){
        var mate = 0
        var opp = []
        for( var i=0; i<this.players.length; i++){
            if (i%2 == 0) mate = i+1; else mate = i-1
            if(i>=2) opp = [0,1]; else opp = [2,3]
            if(this.players[i].id == id){
                return {found: true, index : i, mate: mate, opp: opp}
            }
        }
        return {found: false}
    }

    ping(params){
        let temp = this.isInGame(params.id)
        // console.log(temp)
        let res = {
            status: "failure", 
            notes: 'You have not connected to the game'
        }
        if(!temp.found)
            return res
        else{
            res = {
                status: 'success',
                state: this.state,
                notes: 'Continue Game',
                message: this.broadcast,
                data: this.players[temp.index],
                others: [],
                mate : temp.mate,
                opp : temp.opp
            }
            this.players.forEach(player => res.others.push({name:player.name, id: player.id}))
            return res
        }
    }

    connect(params){ //params: {id, name}
        let res = {
            status: 'failed',
            notes: 'None'
        }

        //check if the same person is there
        if(this.isInGame(params.id).found){
            res.notes = "Reconnected"
            res.status = "success"
            return res
        }
    
        // check number of people
        if(this.players.length==4){
            res.notes = "Game is already taken"
            return res
        }

        res.status = "success"
        res.notes = "Connection successfull"

        // update players
        this.state++
        this.broadcast = params.name + " has connected to the network"
        this.players.push( new Person(params.id, params.name) )

        //give cards to everyone if 4 are connected and set turn as first.id
        
        if(this.players.length==4){
            this.turn = this.players[0].id
            Card.getCards().forEach((set, index)=>{
                // console.log(index)
                // console.log("--------------------")
                // console.log(JSON.stringify(set))
                this.players[index].cards = set
            })
        }
        return res
    }

    play(params){ // id, name, oppoid, card
        //asking card only
        // check if opponent is in game
        console.log("turn is ", this.turn)
        params.card = new Card(params.card.num, params.card.suit)
        if(this.turn != params.id) return {status:"failed", notes:"Oops! not your turn yet"}
        var temp = this.isInGame(params.opp) 
        if(! temp.found) return {status: "failed", notes:"Opponent not in game!"}

        // check if the user has the card
        var self = this.isInGame(params.id)
        if(! self.found) return {status: "failed", notes:"You are not in game!"}
        self = this.players[self.index]
        self.cards.forEach(l=>console.log(l))
        if(self.queryCard(params.card).found) return {status: "failed", notes: "Cannot ask your own card"}

        //check if user has a card in the set
        var setIndex = params.card.toSet()
        if(self.cards[setIndex].length==0)return {status: "failed", notes: "Cannot ask if you have empty set"}

        // valid query, so increment state
        this.state++

        //remove the card from the opponent and set broadcast
        var opponent = this.players[temp.index]
        var isRemoved = opponent.removeCard(params.card)

        var resp = {}
        if(isRemoved){
            resp =  {status: "success", notes:`Removed ${params.card.num} ${params.card.suit} from ${opponent.name}!`}
            // add the card to asker
            self.cards[setIndex].push(params.card)
        }
        else {
            this.turn = opponent.id
            resp = {status: "failed", notes: `${opponent.name} does not have ${params.card.num} ${params.card.suit}`}
        }
        this.broadcast = resp.notes
        console.log("responded with ")
        console.log(resp)
        return resp
    }
}
module.exports = Game