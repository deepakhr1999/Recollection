# Recollection Card Game

## Installation
```sh
npm install
```

## Running server
```sh
node server/index.js
```

## Configuring connection
### Game password
In `server/index.js` file, the game password is set to `wagamama`. This password is also mentioned in the globals file `client/js/globals.js`. The client with the correct game password is allowed interact with the game in the server.

### Secret
In the `client/js/globals.js`, we use the `SECRET` field to authenticate the user in the game. So, someone else cannot fake your identity to play the game on your behalf. This needs to stay unchanged through the duration of the game.

### Server
In the `client/js/globals.js`, we use the `SERVER` field to set the url endpoint our client is going to hit. When you run `node server/index.js`, the output might be as follows.
```
App running on 3000!
{
  interfaces: [
    { ifname: '127.0.0.1' },
    { ifname: '::1' },
    { ifname: 'fe80::1' },
    { ifname: 'fe80::1436:904f:c498:8400' },
    { ifname: '192.168.0.103' }
  ]
}
```
In this case, you have to set the `SERVER` field to `http://192.168.0.103:3000`.



## Client in web browser
Just open `client/index.html` in your browser. Have three more people configure connection: their game password same as yours, whereas their name and secret different from yours.

Note that the game assigns your teammate based on the order you guys first ping the server. So if 4 people named `p1`, `p2`, `p3`, `p4` connect to the server in that order, `p1-p2` and `p3-p4` are made as two teams. `p1` always starts first.



