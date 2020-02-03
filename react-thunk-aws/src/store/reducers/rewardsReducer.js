import ActionConstant from '../../constants/action';

const initialState = {
  totalRewardPoints: '',
  activeMonth: '',
  rewardsPerMonth: [],
  isLoading: false,
  error: null,
  userId: 'michael'
};

export default function rewardsReducer(state = initialState, action) {
  let { FETCH_USER_REWARDS, FETCH_USER_REWARDS_SUCCESS, FETCH_USER_REWARDS_FAILURE } = ActionConstant;
  switch (action.type) {
    case FETCH_USER_REWARDS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_USER_REWARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalRewardPoints: action.payload.totalRewardPoints,
        activeMonth: action.payload.activeMonth,
        rewardsPerMonth: [...state.rewardsPerMonth, ...action.payload.rewardsPerMonth]
      };

    case FETCH_USER_REWARDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}