var nums = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
var suits = ['hearts', 'spades', 'clubs', 'diamonds']
class Card{
    constructor(num, suit){
        this.num = num
        this.suit = suit
    }
    equals(other){
        return this.num==other.num && this.suite==other.suite
    }
    static getCards() {
        
        var cards = []
        for(var s=0;s<52;s++)
            cards.push(s)
    
        shuffle(cards)
        shuffle(cards)
    
        // then distribute the cards
        cards = distribute(cards)
        for( var i=0; i<4; i++) cards[i] = grouped(cards[i])
        return cards
    }
}


const grouped = (cards) => {
    var result = [[], [], [], [], [], [], [], []]
    cards.forEach((ele)=>{
        suit = Math.floor(ele/13)
        isUp = ele%13 >=7
        index = suit * 2 + isUp
        result[index].push(toCard(ele))
    })
    return result
}
const shuffle = (arr) =>{
    index = arr.length
    while(index != 0){
        rand_index = Math.floor(Math.random() * index)
        index -= 1

        temp = arr[index]
        arr[index] = arr[rand_index]
        arr[rand_index] = temp
    }
}
const toCard = n => {
    return {
        num: nums[n%13],
        suit: suits[Math.floor(n/13)]
    }
}
const distribute = (nums) => {
    dist = [[],[],[],[]]
    nums.forEach((ele, index)=>{
        dist[index % 4].push(ele)
    })
    dist.forEach(row=>{
        row.sort((x, y)=>x-y)
        // row.forEach((ele, index)=>{
        //     row[index] = toCard(ele)
        // })
    })
    return dist
}

module.exports = Card

// console.log(Card.getCards()[1])
// L = []
// for( var i=0; i< 52; i++) L.push(i)
// console.log(grouped(L))