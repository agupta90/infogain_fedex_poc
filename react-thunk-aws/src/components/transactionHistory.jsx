import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { connect } from "react-redux";
import { fetchRewards } from '../store/actions/index';
import Rewards from './rewards';
import './transactionHistory.css';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'block',
        fontSize: '1.5rem',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    titleRight: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

const StyledBadge = withStyles(theme => ({
    badge: {
        right: -25,
    },
}))(Badge);

const PrimarySearchAppBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar className="App-css myClass" position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h4" noWrap>Transaction History</Typography>
                    <a href="/"><StyledBadge badgeContent={props.totalRewardPoints} max={999999} color="primary" className="MuiBadge-badge" /></a>
                    <span className="title-right">Welcome, {props.userId}</span>
                </Toolbar>
            </AppBar>
        </div>
    );
}

class TransactionsHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            activeMonth: "",
            rewards: [],
            transactions: [],
            visibleTransactions: []
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchRewards());
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            userId: nextProps.userId,
            activeMonth: nextProps.activeMonth,
            rewards: nextProps.rewards,
            transactions: nextProps.transactions,
            visibleTransactions: nextProps.visibleTransactions || []
        });
    }
    
    render() {
        let { totalRewardPoints, userId } = this.props;
        return (
            <React.Fragment>
                <PrimarySearchAppBar totalRewardPoints={totalRewardPoints} userId={userId} />
                <Rewards userId={this.state.userId}
                    activeMonth={this.state.activeMonth}
                    rewards={this.state.rewards}
                    transactions={this.state.transactions}
                    visibleTransactions={this.state.visibleTransactions} 
                    />
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    console.log("MSP: ", state);
    return ({
        totalRewardPoints: state.rewards.totalRewardPoints || '',
        activeMonth: state.rewards.activeMonth,
        rewards: state.rewards.rewardsPerMonth || [],
        userId: state.rewards.userId,
        isLoadingRewards: state.rewards.isLoading,
        errorRewards: state.rewards.error,
        transactions: state.transactions.transactions || [],
        visibleTransactions: state.transactions.visibleTransactions || [],
        isLoadingTransactions: state.transactions.isLoading,
        errorTransactions: state.transactions.error
    });
}
export default connect(mapStateToProps)(TransactionsHistory);