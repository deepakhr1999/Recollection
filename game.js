const Person = require('./person.js')
const Card = require('./card.js')
class Game{
    constructor(password){
        this.password = password
        this.players = []
        this.state = 0
        this.broadcast = "Game init"
    }
    process(request){ // request {password, command, params}
        console.log(request)
        if(this.password != request.password)
            return {
                status: 'failed',
                notes: 'authentication failure'
            }
        if(typeof this[request.command] === "function")
            return this[request.command](request.params)
    }

    isInGame(id){
        for( var i=0; i<this.players.length; i++)
            if(this.players[i].id == id){
                return {found: true, index : i}
            }
        return {found: false}
    }

    ping(params){
        let temp = this.isInGame(params.id)
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
                notes: 'your are in the game!',
                data: this.players[temp.index],
                others: []
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
            res.notes = "You are already connected"
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

        //give cards to everyone if 4 are connected
        if(this.players.length==4)
            Card.getCards().forEach((set, index)=>{
                this.players[index].cards = set
            })

        return res
    }
}
module.exports = Game