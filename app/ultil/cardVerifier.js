export const verify = async (cardPair, resetSelectedCard, flipCard) => {
    if (cardPair.length == 2) {
        let test = null;
        cardPair.forEach(card => {
            if (test == null)
                test = card;
            else if (test.value != card.value)
                setTimeout(() => flip(cardPair, resetSelectedCard, flipCard), 1000)
            else
                resetSelectedCard();
        });
    } 
}

flip = async (cardPair, resetSelectedCard, flipCard) => {
    if (cardPair.length == 2) {
        cardPair.forEach(card => {
            flipCard(card.key);
        });
        resetSelectedCard();
    }
}

export const hasWinner = async (cards) => {
    return cards.find(card => card.flip == false) == null;
}