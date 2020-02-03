import React from 'react';
import { connect } from "react-redux";
import { fetchTransactions } from '../store/actions/index';
import Transactions from './transactions';

const RewardsTile = ( reward, active, onClick ) => {
}

class Rewards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.getTransactionsPerBatch = this.getTransactionsPerBatch.bind(this);
    }
    // componentDidMount() {
    // }
    // shouldComponentUpdate(){
    // }
    // componentDidUpdate(){
    // }
    // componentWillUnmount() { 
    // }
    // staticGetDerivedStateFromProps(props, state){
    // }
    getTransactionsPerBatch(batchFilter){
        this.props.dispatch(fetchTransactions(this.props.userId, batchFilter))
    }
    render(){
        console.log(this.props);
        return(
            <Transactions userId = {this.props.userId} 
            transactionsCount = {this.props.transactionsCount} 
            transactions = {this.props.transactions} />
            // <div>
            // {Object.keys(this.state.rewards).map((itm, idx) => {
            //     return (<RewardsTile
            //         key={idx}
            //         reward={itm}
            //         active={itm.month==this.state.activeMonth?true:false}
            //         onClick={this.setActiveMonth} />);
            // })}              
            // </div>
        )
    }
}
export default Rewards;