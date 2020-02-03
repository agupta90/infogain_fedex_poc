import ActionConstant from '../../constants/action';
import APIConstant from '../../constants/api';

let {baseURL} = APIConstant;

export const fetchRewards = (userId = 'michael') => {
	return dispatch => {
		dispatch(fetchUserRewards());
		return fetch(`${baseURL}rewards?user=${userId}`)
			.then(res => res.json())
			.then(json => {
				setTimeout(() => {
					dispatch(fetchUserRewardsSuccess(json.response.totalRewardPoints, json.response.activeMonth, json.response.rewardsPerMonth));
				}, 3000)
				return {activeMonth: json.response.activeMonth, rewardsPerMonth: json.response.rewardsPerMonth} ;
			})
			.then(({activeMonth, rewardsPerMonth})=> {
				let transactionFilter = rewardsPerMonth.filter(function(reward){
					if(reward.month == activeMonth){            
						 return reward;
					}
				})
				dispatch(fetchTransactionsCount('michael', transactionFilter[0].filter))
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

export const fetchTransactionsCount = (userId = 'michael', filter) => {
	let batch = "*."+filter;
	return dispatch => {
		dispatch(fetchUserTransactionsCount());
		return fetch(`${baseURL}transactions?user=${userId}&batch=${batch}`)
			.then(res => res.json())
			.then(json => {
				setTimeout(() => {
					dispatch(fetchUserTransactionsCountSuccess(json.response));
				}, 3000)
			})
			.then(
				dispatch(fetchTransactions('michael', "1."+filter))
			)
			.catch(error => dispatch(fetchUserTransactionsCountFailure(error)));
	};
}

export const fetchUserTransactionsCount = () => ({
	type: ActionConstant.FETCH_USER_TRANSACTIONS_COUNT
});

export const fetchUserTransactionsCountSuccess = (transactionsCount) => ({
	type: ActionConstant.FETCH_USER_TRANSACTIONS_SUCCESS_COUNT,
	payload: { transactionsCount }
});

export const fetchUserTransactionsCountFailure = (error) => ({
	type: ActionConstant.FETCH_USER_TRANSACTIONS_FAILURE_COUNT,
	payload: { error }
});

export const fetchTransactions = (userId = 'michael', batch) => {
	return dispatch => {
		dispatch(fetchUserTransactions());
		return fetch(`${baseURL}transactions?user=${userId}&batch=${batch}`)
			.then(res => res.json())
			.then(json => {
				setTimeout(() => {
					dispatch(fetchUserTransactionsSuccess(json.response));
				}, 3000)
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