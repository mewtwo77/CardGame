import { ADD_SELECTED_CARD, RESET_SELECTED_CARDS, FLIP_CARD, GENERATE_CARDS } from '../actions/types';
import { CARD_PAIRS_VALUE } from '../../ultil/cardRandomizer';

const initialState = {
    cards: [],
    selectedCards: []
}

const cardReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_SELECTED_CARD:
            return {
                ...state,
                selectedCards: state.selectedCards.concat(action.card)
            };


        case RESET_SELECTED_CARDS:
            return {
                ...state,
                selectedCards: []
            };

        case GENERATE_CARDS: {
            let cards = CARD_PAIRS_VALUE();
            let deck = [];
            cards.forEach(card => {
                deck.push({
                    key: card.key,
                    value: card.value,
                    flip: card.flip,
                })
            });
            return {
                ...state,
                cards: deck
            }
        }

        case FLIP_CARD:
            return {
                ...state,
                cards: state.cards.map(
                    (item) => {
                        let temp = Object.assign({}, item);
                        if (temp.key == action.key)
                            temp.flip = !temp.flip;
                        return temp;
                    }
                )
            };
        default:
            return state;
    }
}

export default cardReducer;