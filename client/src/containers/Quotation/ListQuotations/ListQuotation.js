import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getQuotations } from '../../../store/actions/articlesActions';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

class ListQuotation extends Component {

    componentDidMount() {
       // this.getQuotations();
    }

    getQuotations() {
        //if (this.props.job_id) {
        //    this.props.getQuotations(this.props.job_id);
        //}
    }

    render() {
        return (
            <div className="container">
                HELLO{this.props.job_id}

                <Table selectable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Number of workers</Table.HeaderCell>
                            <Table.HeaderCell>Hourly wage</Table.HeaderCell>
                            <Table.HeaderCell>Total price</Table.HeaderCell>
                            <Table.HeaderCell>Hours</Table.HeaderCell>
                            <Table.HeaderCell>Creator</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.quotations.map(quotation => {
                                return (
                                    <Table.Row key={quotation._id} >
                                        <Table.Cell>
                                            {quotation.description}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {quotation.workers}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {quotation.wage}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {quotation.price}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {quotation.hours}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {quotation.trader_user_id}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.article,
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername,
        user_id: state.users.user_id,
        quotations: state.articles.quotations,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getQuotations: (job_id) => dispatch(getQuotations(job_id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListQuotation));