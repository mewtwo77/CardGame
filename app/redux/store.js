import { createStore, combineReducers } from 'redux';
import cardReducer from './reducer/cardReducer';
import stepReducer from './reducer/stepReducer';

const rootReducer = combineReducers({
  cardReducer: cardReducer,
  stepReducer: stepReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;