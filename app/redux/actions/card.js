import { ADD_SELECTED_CARD, RESET_SELECTED_CARDS, ADD_CARD, GENERATE_CARDS, FLIP_CARD } from './types';

export const addSelectedCard = (card) => (
    {
        type: ADD_SELECTED_CARD,
        card: card
    }
);

export const resetSelectedCards = () => (
    {
        type: RESET_SELECTED_CARDS
    }
);

export const addCard = (card) => (
    {
        type: ADD_CARD,
        key: card.key,
        value: card.value,
        flip: card.flip,
    }
);

export const generateCards = () => (
    {
        type: GENERATE_CARDS
    }
);

export const flipCard = (key) => (
    {
        type: FLIP_CARD,
        key: key
    }
);