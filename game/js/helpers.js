async function bring(url,body, method="POST"){
    return new Promise((resolve, reject)=>{
        var http = new XMLHttpRequest();
        http.open(method, url, true);
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = function() {
            try{
                if(http.readyState == 4 && http.status == 200) 
                    resolve(JSON.parse(http.responseText))            
            }catch(err){
                reject(err)
            }
        }
        http.send(body)
    })
}

let cardsHTML = {"2": "<section class=\"card card--heart\" value=\"2\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "3": "\n<!-- 3 -->\n<section class=\"card card--heart\" value=\"3\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "4": "\n<!-- 4 -->\n<section class=\"card card--heart\" value=\"4\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "5": "\n<!-- 5 -->\n<section class=\"card card--heart\" value=\"5\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "6": "<!-- 6 -->\n<section class=\"card card--heart\" value=\"6\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "7": "<!-- 7 -->\n<section class=\"card card--heart\" value=\"7\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol--huge\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>\n\n", "8": "<!-- 8 -->\n<section class=\"card card--heart\" value=\"8\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol--big\"></div>\n            <div class=\"card__symbol card__symbol--big\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>\n", "9": "<!-- 9 -->\n<section class=\"card card--heart\" value=\"9\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "10": "<!-- 10 -->\n<section class=\"card card--heart\" value=\"10\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol--big\"></div>\n            <div class=\"card__symbol card__symbol--big\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "J": "<section class=\"card card--heart\" value=\"J\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "Q": "<section class=\"card card--heart\" value=\"Q\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "K": "<section class=\"card card--heart\" value=\"K\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "A": "<section class=\"card card--heart\" value=\"A\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>"}
 
const getCard = (num, suit)=>{
    return cardsHTML[num].replace("heart", suit)
}

const setMessage = (flag, message)=>{
    document.getElementById("alert").innerHTML = message
    document.getElementById("alert").style.display = ""
    if(flag=="success") return flag
    else return "danger"
}

const setBroadcast = (message) => {
    ele = document.getElementById("broadcast")
    ele.style.display = ""
    ele.innerHTML = message
    return "danger"
    if(message.includes('not')) return "danger"
    else return "success"
}