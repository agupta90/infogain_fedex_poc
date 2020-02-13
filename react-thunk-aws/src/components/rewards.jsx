import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './rewards.css';
import { connect } from "react-redux";
import { fetchTransactions, updateActiveMonth } from '../store/actions/index';
import Transactions from './transactions';

function Tiles(props) {
    return (
        <div className={props.active ? "rewardTile activeTile" : "rewardTile"}
            onClick={() => {
                props.clickHandler("1", props.reward.filter, props.reward.month, props.reward.totalTransactionCount)
            }}>
            <div className="rewardTileWrapper">
                <div className="rewardTxnAmt">${props.reward.totalTransactionAmount}</div>
                <p className="rewardTxt">Rewards</p>
                <h3 className="rewardPts">{props.reward.rewards} <small>pts.</small></h3>
            </div>
            <div className="rewardMonth">
                <a href="#">{props.reward.month}</a>
            </div>
        </div>
    );
}

class Rewards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            batchNo: 1,
            filter: "",
            activeMonth: "",
            transactions: [],
            transactionsCount: 0,
            visibleTransactions: []
        };
        this.getTransactionsPerBatch = this.getTransactionsPerBatch.bind(this);
    }

    getTransactionsPerBatch(batchNo, filter, activeMonth, txnCount) {
        let executeFetch = true;
        let visibleTransactions = [];

        for (let record of this.props.transactions) {
            if (record.date.includes(filter) && record.batchNo.includes(batchNo)) {
                executeFetch = false;
                break;
            }
        }

        if (executeFetch) {
            this.props.dispatch(updateActiveMonth(activeMonth));
            this.props.dispatch(fetchTransactions(this.props.userId, batchNo + "." + filter));
            this.setState({ transactionsCount: txnCount, filter: filter, activeMonth: activeMonth });
        }
        else {
            for (let record of this.props.transactions) {
                if (record.date.includes(filter) && record.batchNo.includes(batchNo)) {
                    visibleTransactions.push(record);
                }
            }

            this.setState({ transactionsCount: txnCount, filter: filter, activeMonth: activeMonth, visibleTransactions: visibleTransactions });
        }
    }

    componentWillReceiveProps(nextProps) {
        let filter = "";
        let txnCount = 0;
        for (let itm of nextProps.rewards) {
            if (itm.month == nextProps.activeMonth) {
                filter = itm.filter;
                txnCount = itm.totalTransactionCount;
                break;
            }
        }

        if (nextProps !== this.props) {
            this.setState({
                filter: filter,
                activeMonth: nextProps.activeMonth,
                transactions: nextProps.transactions,
                transactionsCount: txnCount,
                visibleTransactions: nextProps.visibleTransactions || []
            });
        }
    }
    render() {
        return (
            <Grid container className="Wrapper">
                <Grid item md={3} sm={12} xs={12}>
                    {Object.values(this.props.rewards).map((itm, idx) => {
                        return (<Tiles
                            key={idx}
                            reward={itm}
                            active={itm.month == this.state.activeMonth ? true : false}
                            clickHandler={this.getTransactionsPerBatch} />);
                    })}
                </Grid>
                <Transactions
                    transactionsCount={this.state.transactionsCount}
                    transactions={this.state.visibleTransactions}
                    filter={this.state.filter}
                    activeMonth={this.state.activeMonth}
                    paginationHandler={this.getTransactionsPerBatch} />
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return ({
        transactions: state.transactions.transactions || [],
        visibleTransactions: state.transactions.visibleTransactions || [],
        isLoadingTransactions: state.transactions.isLoading,
        errorTransactions: state.transactions.error
    });
}
export default connect(mapStateToProps)(Rewards);