import ActionConstant from '../../constants/action';

const initialState = {
  transactionsCount: '',
  transactions: [],
  isLoading: false,
  error: null,
  userId: 'michael',
  batch: '1'
};

export default function transactionsReducer(state = initialState, action) {
  let { FETCH_USER_TRANSACTIONS, FETCH_USER_TRANSACTIONS_SUCCESS, FETCH_USER_TRANSACTIONS_FAILURE, FETCH_USER_TRANSACTIONS_COUNT, FETCH_USER_TRANSACTIONS_SUCCESS_COUNT, FETCH_USER_TRANSACTIONS_FAILURE_COUNT } = ActionConstant;
  switch (action.type) {
    case FETCH_USER_TRANSACTIONS_COUNT:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_USER_TRANSACTIONS_SUCCESS_COUNT:
      return {
        ...state,
        isLoading: false,
        transactionsCount: action.payload.transactionsCount,
      };

    case FETCH_USER_TRANSACTIONS_FAILURE_COUNT:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
      
    case FETCH_USER_TRANSACTIONS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_USER_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: [...state.transactions, ...action.payload.transactions],
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