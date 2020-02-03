import {combineReducers} from 'redux';
import rewardsReducer from './rewardsReducer';
import transactionsReducer from './transactionsReducer';

export default combineReducers({rewards: rewardsReducer, transactions: transactionsReducer});