
const MAX_NUMBER_VALUE = 100;
const PAIR_VALUE = 2;

export const MAX_WIDTH = 3;
export const MAX_HEIGHT = 4;


export const CARD_PAIRS_VALUE = () => {
    let max_generated_no = (MAX_WIDTH * MAX_HEIGHT) / PAIR_VALUE
    let cards = [];
    for (i = 0; i < max_generated_no; i++) {
        let value = Math.floor(Math.random() * (MAX_NUMBER_VALUE + 1))
        for (j = 0; j < PAIR_VALUE; j++) {
            cards.push({
                key: Math.random(),
                value: value,
                flip: false
            })
        }
    }
    return shuffle(cards);
}

shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


