import ActionConstant from '../../constants/action';
import APIConstant from '../../constants/api';

let {baseURL} = APIConstant;

export const fetchRewards = (userId = 'michael') => {
	return dispatch => {
		dispatch(fetchUserRewards());
		return fetch(`${baseURL}rewards?user=${userId}`)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchUserRewardsSuccess(json.response.totalRewardPoints, json.response.activeMonth, json.response.rewardsPerMonth));
				return {activeMonth: json.response.activeMonth, rewardsPerMonth: json.response.rewardsPerMonth} ;
			})
			.then(({activeMonth, rewardsPerMonth})=> {
				let transactionFilter = rewardsPerMonth.filter(function(reward){
					if(reward.month == activeMonth){            
						 return reward;
					}
				})
				dispatch(fetchTransactions('michael', "1."+transactionFilter[0].filter))
			})
			.catch(error => dispatch(fetchUserRewardsFailure(error)));
	};
}

export const fetchUserRewards = () => ({
	type: ActionConstant.FETCH_USER_REWARDS
});

export const fetchUserRewardsSuccess = (totalRewardPoints, activeMonth, rewardsPerMonth) => ({
	type: ActionConstant.FETCH_USER_REWARDS_SUCCESS,
	payload: { totalRewardPoints, activeMonth, rewardsPerMonth }
});

export const fetchUserRewardsFailure = (error) => ({
	type: ActionConstant.FETCH_USER_REWARDS_SUCCESS,
	payload: { error }
});

export const fetchTransactions = (userId = 'michael', batch) => {
	return dispatch => {
		dispatch(fetchUserTransactions());
		return fetch(`${baseURL}transactions?user=${userId}&batch=${batch}`)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchUserTransactionsSuccess(json.response));
			})
			.catch(error => dispatch(fetchUserTransactionsFailure(error)));
	};
}

export const fetchUserTransactions = () => ({
	type: ActionConstant.FETCH_USER_TRANSACTIONS
});

export const fetchUserTransactionsSuccess = (transactions) => ({
	type: ActionConstant.FETCH_USER_TRANSACTIONS_SUCCESS,
	payload: { transactions }
});

export const fetchUserTransactionsFailure = (error) => ({
	type: ActionConstant.FETCH_USER_TRANSACTIONS_FAILURE,
	payload: { error }
});


export const updateActiveMonth = (activeMonth) => ({
	type: ActionConstant.UPDATE_ACTIVE_MONTH,
	payload: { activeMonth }
});