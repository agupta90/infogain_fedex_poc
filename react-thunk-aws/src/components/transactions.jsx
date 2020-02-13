import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "material-ui-flat-pagination";
import './transactions.css';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TransactionsTable(props) {
  const classes = useStyles();
  return (
    <Grid className="table-css" item md={9} xs={12}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Txn ID</StyledTableCell>
              <StyledTableCell align="right">Txn Remarks</StyledTableCell>
              <StyledTableCell align="right">Txn Date</StyledTableCell>
              <StyledTableCell align="right">Txn Amount</StyledTableCell>
              <StyledTableCell align="right">Txn Rewards</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.map(row => (
              <StyledTableRow key={row.transactionId}>
                <StyledTableCell component="th" scope="row">{row.transactionId.slice(4).padStart(row.transactionId.length, '****')}</StyledTableCell>
                <StyledTableCell align="right">{row.transactionRemarks}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.transactionAmount}</StyledTableCell>
                <StyledTableCell align="right">{row.rewardPoints}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          className="MuiButton-textSecondary"
          total={props.total}
          offset={props.offset}
          onClick={(e, offset) => props.setPageCounter(offset)}
        />
      </TableContainer>
    </Grid>
  );
}

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
    this.setPageCounter = this.setPageCounter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeMonth !== this.props.activeMonth){
      this.setState({ offset: 0 });
    }
  }

  setPageCounter = (offset) => {
    this.setState({ offset: offset });
    this.props.paginationHandler(offset+1, this.props.filter, this.props.activeMonth, this.props.transactionsCount);
  }

  render() {
    let { transactions, transactionsCount } = this.props;
    return (
      <TransactionsTable
        transactions={transactions}
        offset={ this.state.offset }
        total={ Math.ceil(transactionsCount/5) }
        setPageCounter={this.setPageCounter} />
    )
  }
}
export default Transactions;