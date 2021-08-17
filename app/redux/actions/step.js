import { ADD_STEP, RESET_STEP } from './types';


export const addStep = (value) => (
    {
        type: ADD_STEP,
        value: value
    }
);


export const resetStep = () => (
    {
        type: RESET_STEP
    }
);

