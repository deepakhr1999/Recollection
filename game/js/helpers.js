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

let cardsHTML = {"2": "<section class=\"card card--heart\" value=\"2\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "3": "\n<!-- 3 -->\n<section class=\"card card--heart\" value=\"3\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "4": "\n<!-- 4 -->\n<section class=\"card card--heart\" value=\"4\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "5": "\n<!-- 5 -->\n<section class=\"card card--heart\" value=\"5\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "6": "<!-- 6 -->\n<section class=\"card card--heart\" value=\"6\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "7": "<!-- 7 -->\n<section class=\"card card--heart\" value=\"7\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol--huge\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>\n\n", "8": "<!-- 8 -->\n<section class=\"card card--heart\" value=\"8\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol--big\"></div>\n            <div class=\"card__symbol card__symbol--big\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>\n", "9": "<!-- 9 -->\n<section class=\"card card--heart\" value=\"9\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "10": "<!-- 10 -->\n<section class=\"card card--heart\" value=\"10\">\n    <div class=\"card__inner\">\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n        <div class=\"card__column card__column--centered\">\n            <div class=\"card__symbol card__symbol--big\"></div>\n            <div class=\"card__symbol card__symbol--big\"></div>\n        </div>\n        <div class=\"card__column\">\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol\"></div>\n            <div class=\"card__symbol card__symbol--rotated\"></div>\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "J": "<section class=\"card card--heart\" value=\"J\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "Q": "<section class=\"card card--heart\" value=\"Q\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "K": "<section class=\"card card--heart\" value=\"K\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "A": "<section class=\"card card--heart\" value=\"A\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <div class=\"card__symbol\"></div>\n        </div>\n    </div>\n</section>", "L": "<section class=\"card text-white\" style=\"background-color: #d50000;\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <h1 class=\"card__symbol\" style=\"font-family:Verdana, Geneva, Tahoma, sans-serif;\">L</h1>\n        </div>\n    </div>\n</section>\n", "W": "<section class=\"card text-white\" style=\"background-color: #ff6f00 ;\">\n    <div class=\"card__inner card__inner--centered\">\n        <div class=\"d-flex align-items-center p-0\">\n            <h1 class=\"card__symbol\" style=\"font-family:Verdana, Geneva, Tahoma, sans-serif;\">W</h1>\n        </div>\n    </div>\n</section>"}
 
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
    if(message.includes('not')) return "danger"
    else return "success"
}


const putMessage = (message)=>{
    // flag is either console or chat
    div = document.getElementById("chatbox")
    node = document.createElement("div")
    node.classList.add('message')
    if (message.sender != "console"){
    /*
        <div class="message">
            <span>Deepak</span> Hello world 
        </div>
    */
        span = document.createElement('span')
        span.appendChild( document.createTextNode(message.sender) )
        node.appendChild(span)
        node.appendChild(document.createTextNode(message.value))        
    }else{
     /*
        <div class="message">
            <div class="message-console">Call by someone failed</div>
        </div>
    */
        messageConsole = document.createElement("div")
        messageConsole.classList.add("message-console")
        messageConsole.appendChild( document.createTextNode(message.value) )
        node.appendChild(messageConsole)
    }
    div.appendChild(node)
    div.scrollTop = div.scrollHeight;
}

const colorsList = ["reply-darkest", "amber", "darken-4", "red", "accent-4", "grey"]

const lowerButtonColor =  [ "reply-darkest" ]
const upperButtonColor =  [ "reply-darkest" ]
const emptyButtonColor = [ 'grey', 'darken-4' ]
const winsButtonColor =  [ "amber", "darken-4" ]
const lossesButtonColor =  [ "red", "accent-4" ]

const changeButtonColor = (set_number, newClassName) =>{
    section = document.querySelector('[set_number = "'+set_number+'"]')
    section.classList.remove(...colorsList)
    section.classList.add(...newClassName)
}