'use strict';

var os = require('os');
const ipconfig = ()=>{
    var ifaces = os.networkInterfaces()
    var res = {}
    res["interfaces"] = []
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            // if ('IPv4' !== iface.family || iface.internal !== false)
            // return;
            
            res.interfaces.push({ifname : iface.address});
            // if (alias >= 1) {
            // // this single interface has multiple ipv4 addresses
            // console.log(ifname + ':' + alias, iface.address);
            // } else {
            // // this interface has only one ipv4 adress
            // console.log(ifname, iface.address);
            // }
            
        });
    });
    return res
}

module.exports = ipconfig