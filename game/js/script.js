var app = angular.module("myApp", []);

var req = {
    password : GLOBALS.PASSWORD,
    command : "ping",
    params:{
        id: GLOBALS.NAME,
        name: GLOBALS.SECRET,
        state: 0,
        message: "",
    }
}

// value of the state shared with all the scopes
var state = {
    id: GLOBALS.NAME,
    name: GLOBALS.SECRET,
    state: 0,
    cards: [],
    server: "http://localhost:3000",
    wins: [],
    losses: []
}


app.controller('connect', function($scope) {
    $scope.print = console.log
    $scope.server = GLOBALS.SERVER
    $scope.password = GLOBALS.PASSWORD
    $scope.connect = ()=> {
        req.password = $scope.password
        state.server = $scope.server
        req.command = "connect"
        req.params = {
            id: $scope.id,
            name: $scope.name
        }
        body = JSON.stringify(req)
        bring($scope.server, body)
        .then(resp => {
            // to do emit mssg
            if(resp.status == "success" ){
                state.server = $scope.server
                state.id = req.params.id
                state.name = req.params.name
                state.password = req.password
                // document.getElementById('connect').style.display = "None"
            }
            console.log("Inside connect", resp)
        })
        .catch(err=>console.log(err))
    }
    
    $scope.id = GLOBALS.NAME
    $scope.name = GLOBALS.SECRET
    $scope.connect()
});

app.controller('cards', ($scope)=>{
    $scope.cards = []
    $scope.name = "playerName1"
    $scope.id = "playerId1"
    $scope.message = ""
    $scope.set = 0
    $scope.otherPlayers = [
        {name: "playerName2", id: "playerId2"},
        {name: "playerName3", id: "playerId3"},
        {name: "playerName4", id: "playerId4"},
    ]
    $scope.winsCount = 0
    $scope.lossesCount = 0

    $scope.displaySet = (index)=>{
        console.log('called with', index)
        $scope.set = index
        sections = document.querySelectorAll(".cards")
        sections.forEach(s=>{s.style.display = "None"})
        sections[index].style.display = ""
    }


    $scope.setPlayer = (index, obj)=>{
        $scope.otherPlayers[index-1].name = obj.name
        $scope.otherPlayers[index-1].id = obj.id
    }


    $scope.ping = ()=>{
        req.command = "ping"
        $scope.id = req.params.id
        $scope.name = req.params.name
        req.params.state = state.state
        bring(state.server, JSON.stringify(req))
        .then(resp => {
            resp.messages.forEach( message => putMessage(message) )

            if(resp.status == "failed"){
                $scope.$digest()
                return
            }

            // if there was no state change nor status failed
            // there is no message
            if(resp.state == state.state) return

            console.log("State change detected")


            // the most important of all: update the state of the app
            state.state = resp.state
            sections = document.querySelectorAll(".cards")
            
            /** STEPS TO BE FOLLOWED WHILE SETTING CARDS
             * 1. Inserting cards into the respective sections
             * 2. Dealing with sets won and lost by the user  
             * 3. Dealing with sets for which user does not have cards
             * 4. Displaying info about players
             */
            
            // 1. Inserting cards into respective sections
                $scope.cards = resp.data.cards
                $scope.cards.forEach((set, i)=>{
                    x = ""
                    set.forEach(card =>{
                        x = x + getCard(card.num, card.suit)
                    })

                    sections[i].innerHTML = x
                })

            // 2. Dealing with sets won and lost by the user

                // 2a. setting the win and loss cards inside those sections.
                    state.wins = resp.wins
                    state.losses = resp.losses
                    state.wins.forEach(index => sections[index].innerHTML = getCard('W', "wins"))
                    state.losses.forEach(index => sections[index].innerHTML = getCard('L', "losses"))
                
                // 2b. setting the scores in the scope
                    $scope.winsCount = state.wins.length
                    $scope.lossesCount = state.losses.length
            
                // 2c. setting color for the buttons as win or lose.
                    state.wins.forEach(set_number => changeButtonColor(set_number, winsButtonColor))
                    state.losses.forEach(set_number => changeButtonColor(set_number, lossesButtonColor))

            // 3. Dealing with sets for which user does not have cards
                // loop over all sets where index not in wins or losses
                $scope.cards.forEach( (set, index) => {
                    if(set.length == 0 & !state.wins.includes(index) & !state.losses.includes(index))
                        changeButtonColor(index, emptyButtonColor)
                })

            // 4. Displaying info about players
                // 4a. Names
                    $scope.setPlayer(1, resp.others[resp.mate])
                    $scope.setPlayer(2, resp.others[resp.opp[0]])
                    $scope.setPlayer(3, resp.others[resp.opp[1]])

                // 4b. Whose turn to play? resp.turn
                    document.querySelectorAll(".turn")[0].classList.remove("turn")
                
                // 4c. If there is turn info, set the user who has to play in 0.5sec
                    if(resp.turn != "")
                        setTimeout(()=>{
                            document.getElementById("id-"+resp.turn).classList.add("turn")
                        }, 500)
                

            // diplay set
            $scope.displaySet($scope.set)
            $scope.$digest();
        })
        .catch(err=> console.log(err))
    }
    setInterval($scope.ping, 3000)

    $scope.play = ()=>{
        req.command = "play"
        req.params.opp = $scope.askedOpponent
        req.params.card = {num:$scope.number, suit:$scope.suit}
        bring(state.server, JSON.stringify(req))
        .then(resp => {
            if(resp.status=='success')
                $scope.ping()
            else{
                $scope.$digest()
                putMessage({
                    sender:'console', 
                    value:resp.message 
                })
            }
        })
        .catch(err => console.log(err))
    }

    $scope.call = ()=>{
        req.command = "call"
        req.params.set = $scope.set
        bring(state.server, JSON.stringify(req))
        .then(resp=>{
            if(resp.status=='success')
                $scope.ping()
            else{
                $scope.$digest()
                putMessage({
                    sender:'console', 
                    value:resp.message 
                })
            }
        })
        .catch(err=> console.log(err))
    }

    $scope.sendMessage = ()=>{
        // do not send empty message
        console.log("Inside sendMessage")

        req.command = "takeMessage"
        let effective = $scope.message.replace(/(\r\n|\n|\r)/gm, "")
        if(effective == "") return

        // send the message to the server and make textarea blank
        req.params.message = $scope.message
        console.log(req)

        bring(state.server, JSON.stringify(req))
        .then(resp=>{
            $scope.message = ""
            if(resp.status=='success')
                $scope.ping()
            else{
                $scope.$digest()
                putMessage({
                    sender:'console', 
                    value:resp.message 
                })
            }
        })
        .catch(err=> console.log(err))
    }
})