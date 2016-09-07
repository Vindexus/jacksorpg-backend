var express = require('express');
var router = express.Router();
var cards = require('../lib/cards');
var deck = new cards.PokerDeck();
deck.shuffleAll();

var originalHand = deck.draw(5)
var hands = []

function strToCard (str) {
  var parts = str.split('.')
  return new cards.Card(parts[0], parts[1])
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { hand : originalHand, hands: hands });
});

router.get('/json/:type', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  var json = null
  if(req.params.type == 'string') {
    json = 'This is my string.';
  }
  else if(req.params.type == 'item') {
    json = {label: 'Sword of Truth', id: 98}
  }
  else if(req.params.type == 'listint') {
    json = [4,8,15,16,23,42]
  }
  else if(req.params.type == 'items') {
    json = [{label: 'Dented Shield', id: 22}, {label: 'The Grandfather', id: 22}, {label: 'Heavy Bolter', id: 39}]
  }

  res.json(json)
})

router.get('/newhand', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var deck = new cards.PokerDeck();
  deck.shuffleAll();
  var hand = deck.draw(5)
  console.log('cards.Card', cards.Card)
  res.json({hand: cards.cardsToBasics(hand)})
});


router.get('/getdeals', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var numdeals = 3
  var deals = []
  var originalHand = req.query.hand
  var held = req.query.held.split(",")

  console.log('held', held)

  
  originalHand = originalHand.split(",").map(function (card) {
    return strToCard(card)
  })

  console.log('originalHand', originalHand)

  for(var i = 1; i <= numdeals; i++) {
    var d = new cards.PokerDeck();
    d.shuffleAll();
    for(var k = 0; k < 5; k++) {
      console.log(originalHand[k])
      d.discardACard([originalHand[k].suit, originalHand[k].value])
      //d.draw()
    }    
    var hand = []
    for(var k = 0; k < 5; k++) {
      console.log('held[' + k + ']', held[k])
      hand[k] = held[k] == 1 ? originalHand[k] : d.draw()
    }
    deals.push(cards.cardsToBasics(hand))
  }

  res.json({hand: originalHand, deals: deals})
});

module.exports = router;
