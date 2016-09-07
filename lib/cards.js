var cards = require('cards')

cards.Card.prototype.unicodeSuit = function() {
  return cards.Card.suitUnicodeStrings[this.suit];
};

cards.Card.prototype.toBasic = function () {
  return {suit: this.suit, value: this.value}
}

cards.cardsToBasics = function (hand) {
  var newhand = []
  for(var i = 0; i < hand.length; i++) {
    newhand.push(hand[i].toBasic())
  }
  return newhand
}


module.exports = cards