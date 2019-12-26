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
            // if(resp.status == "success" ){
                state.server = $scope.server
                state.id = req.params.id
                state.name = req.params.name
                state.password = req.password
            // }
            console.log(resp)
        })
        .catch(err=>console.log(err))
    };
});

app.controller('cards', ($scope)=>{
    $scope.cards = []
    $scope.ping = ()=>{
        req.command = "ping"
        bring(state.server, JSON.stringify(req))
        .then(resp => {
            section = document.getElementById("cards")
            x = ""
            resp.data.cards.forEach((card)=>{
                // console.log(card.num)
                x = x + getCard(card.num, card.suite)
            })
            section.innerHTML = x
            console.log(resp)
        })
        .catch(err=> console.log(err))
    }
})