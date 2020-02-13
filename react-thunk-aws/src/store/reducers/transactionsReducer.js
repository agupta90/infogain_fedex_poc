import ActionConstant from '../../constants/action';

const initialState = {
  transactions: [],
  visibleTransactions:[],
  isLoading: false,
  error: null,
  userId: 'michael',
  batch: '1'
};

export default function transactionsReducer(state = initialState, action) {
  let { FETCH_USER_TRANSACTIONS, FETCH_USER_TRANSACTIONS_SUCCESS, FETCH_USER_TRANSACTIONS_FAILURE } = ActionConstant;
  switch (action.type) {     
    case FETCH_USER_TRANSACTIONS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_USER_TRANSACTIONS_SUCCESS:
      console.log(state);
      return {
        ...state,
        isLoading: false,
        transactions: [...state.transactions, ...action.payload.transactions],
        visibleTransactions: action.payload.transactions
      };

    case FETCH_USER_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}