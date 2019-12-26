class Card{
    constructor(num, suite){
        this.num = num
        this.suite = suite
    }
    equals(other){
        return this.num==other.num && this.suite==other.suite
    }
    static getCards() {
        var nums = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        var suits = ['hearts', 'spades', 'clubs', 'diamonds']
        var cards = []
    
        for(var s=0;s<suits.length;s++)
            for(var n=0;n<nums.length;n++)
                cards.push(new Card(nums[n], suits[s]))
    
        shuffle(cards)
        shuffle(cards)
    
        // then distribute the cards
        return distribute(cards)
    }
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

const distribute = (cards) => {
    dist = [[],[],[],[]]
    cards.forEach((card, item)=>{
        dist[item % 4].push(card)
    })
    return dist
}

module.exports = Card