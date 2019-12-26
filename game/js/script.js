var app = angular.module('myApp', []);
var req = {
    password : "wagamama",
    command : "ping",
    params:{
        id: "deepak",
        name: "deepak"
    }
}
var state = {
    id: "",
    name: "",
    state: 0,
    cards: [],
    server: "http://192.168.43.87:3000"
}
app.controller('connect', function($scope) {
    $scope.print = console.log;
    $scope.server = "http://192.168.43.87:3000"
    $scope.password = "wagamama"
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
            console.log(resp)
        })
        .catch(err=>console.log(err))
    };
});

app.controller('cards', ($scope)=>{
    $scope.cards = []
    $scope.name = "Connect"
    $scope.id = ""
    $scope.isMessage = true
    $scope.messageType = "success"
    $scope.text = "Welcome to the Game!" 
    $scope.ping = ()=>{
        req.command = "ping"
        $scope.id = req.params.id
        $scope.name = req.params.name
        bring(state.server, JSON.stringify(req))
        .then(resp => {
            if(resp.status=="success") {$scope.messageType = "success"}
            else {$scope.messageType = "danger"}
            document.getElementById("alert").innerHTML = resp.notes
            console.log($scope.text)
            sections = document.querySelectorAll(".cards")
            resp.data.cards.forEach((set, i)=>{
                x = ""
                set.forEach(card =>{
                    x = x + getCard(card.num, card.suit)
                })
                sections[i].innerHTML = x
            })
            displaySet(0)
        })
        .catch(err=> console.log(err))
    }
})