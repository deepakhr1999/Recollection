const Person = require('./person.js')
const Card = require('./card.js')
class Game{
    constructor(password){
        this.password = password
        this.players = []
        this.state = 0
        this.broadcast = "Game init"
        this.id = "hellothere"
        this.wins = [[], []]
        this.turn = ""
    }

    process(request){ // request {password, command, params}
        // console.log(request)
        if(this.password != request.password)
            return {
                status: 'failed',
                message: 'authentication failure'
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
                return {found: true, index : i, mate: mate, opp: opp, team: Math.floor(i/2)}
            }
        }
        return {found: false}
    }

    ping(params){
        let temp = this.isInGame(params.id)
        // console.log(temp)
        let res = {
            status: "failure", 
            message: 'You have not connected to the game'
        }
        if(!temp.found)
            return res
        else{
            res = {
                status: 'success',
                state: this.state,
                message: this.broadcast,
                data: this.players[temp.index],
                others: [],
                mate : temp.mate,
                opp : temp.opp,
                turn: this.turn
            }
            this.players.forEach(player => res.others.push({name:player.name, id: player.id}))
            return res
        }
    }

    connect(params){ //params: {id, name}
        let res = {
            status: 'failed',
            message: 'None'
        }

        //check if the same person is there
        if(this.isInGame(params.id).found){
            res.message = "Reconnected"
            res.status = "success"
            this.state++
            return res
        }
    
        // check number of people
        if(this.players.length==4){
            res.message = "Game is already taken"
            return res
        }

        res.status = "success"
        res.message = "Connection successfull"

        // update players
        this.state++
        this.broadcast = params.name + " has connected to the network"
        this.players.push( new Person(params.id, params.name) )

        //give cards to everyone if 4 are connected and set turn as first.id
        
        if(this.players.length==4){
            this.turn = this.players[0].id
            Card.getCards().forEach((set, index)=>{
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
        if(this.turn != params.id) return {status:"failed", message:"Oops! not your turn yet"}
        var temp = this.isInGame(params.opp) 
        if(! temp.found) return {status: "failed", message:"Opponent not in game!"}

        // check if the user has the card
        var self = this.isInGame(params.id)
        if(! self.found) return {status: "failed", message:"You are not in game!"}
        self = this.players[self.index]
        self.cards.forEach(l=>console.log(l))
        if(self.queryCard(params.card).found) return {status: "failed", message: "Cannot ask your own card"}

        //check if user has a card in the set
        var setIndex = params.card.toSet()
        if(self.cards[setIndex].length==0)return {status: "failed", message: "Cannot ask if you have empty set"}

        // valid query, so increment state
        this.state++

        //remove the card from the opponent and set broadcast
        var opponent = this.players[temp.index]
        var isRemoved = opponent.removeCard(params.card)

        var resp = {}
        if(isRemoved){
            resp =  {status: "success", message:`Removed ${params.card.num} ${params.card.suit} from ${opponent.name}!`, flag:"success"}
            // add the card to asker
            self.cards[setIndex].push(params.card)
        }
        else {
            this.turn = opponent.id
            resp = {status: "success", message: `${opponent.name} does not have ${params.card.num} ${params.card.suit}`, flag:"danger"}
        }
        this.broadcast = resp.message
        console.log("responded with ")
        console.log(resp)
        return resp
    }

    call(params){ // id, name, set(number)
        console.log("Called call function")
        var stats = this.isInGame(params.id)
        if(!stats.found){//then the person is not in game
            return {status: "failed", message: "You are not in game", "flag": "danger"}
        }
        if(params.set>7 || params.set<0)
            return {status: "failed", message: "Bad request with index "+params.set, "flag": "danger"}
        
        var selfCards = this.players[stats.index].cards[params.set]
        if(selfCards.length==0)
            return {status: "failed", message: "Cannot ask if you have empty set", "flag": "danger"}

        // this is a valid call
        this.state++

        // check if they collectively have the entire set
        var mateCards = this.players[stats.mate].cards[params.set]
        var allCards = selfCards.concat(mateCards)
        var isLower = params.set%2
        var correct = false        
        if(isLower) correct = (allCards.length == 7)
        else correct = (allCards.length == 6)

        //either way removeSet from everyone 
        this.players.forEach((p)=>p.removeSet(params.set))

        // then give the set to the winning team
        var team = correct*stats.team + !correct * !stats.team
        this.wins[team].push(params.set)

        // construct a response
        var resp = {}
        if(correct) {
            resp = {status:'success', message: `Call by ${params.id} success! got the set ${params.set}`, "flag":"success"}
        } else {
            resp = {status: 'success', message:`Call by ${params.id} FAILED! got the set ${params.set}`, "flag": "danger"}
        }

        this.broadcast = resp.message
        return resp
    }
}
module.exports = Game