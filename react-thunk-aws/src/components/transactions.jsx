import React from 'react';

// function TransactionsTable({ reward, active, onClick }) {
// }

class Transactions extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    // }
    // componentWillUnmount() {
    // }
    // componentDidUpdate(){
    // }

    render(){
        console.log(this.props);
        return("in transactions"
            // {Object.keys(this.state.transactions).map((itm, idx) => {
            //     return (<TransactionsTable
            //         key={idx}
            //         transactions={itm} />);
            // })}
        )
    }
}
export default Transactions;