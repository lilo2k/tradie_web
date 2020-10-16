import React, { Component } from 'react';
import { connect } from 'react-redux';
import WrappedLink from '../../../components/WrappedLink/WrappedLink';
import { Table } from 'semantic-ui-react';
import * as Constants from '../../../Constants'

import './JobDetail.css'
// import ListQuotation from '../../Quotation/ListQuotations/ListQuotation';

class JobDetail extends Component {
    state = {
        jobs: {},
        quotations: [],
        selectedQuotation: {}
    }

    componentDidMount() {
        // this.getSingleArticle();
        this.getSingleJob();
    }

    getSingleJob() {
        console.log(this.props.match.params.id);
        let apiURLforQuotation = '';
        if (this.props.match.params.id) {
            let apiURL = Constants.URL + 'jobs/?jid=' + this.props.match.params.id;
            console.log(apiURL)
            fetch(apiURL)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    console.log(JSON.stringify(res.jobs));
                    if (res.jobs) {
                        this.setState(
                            { jobs: res.jobs }
                        );
                    }
                    if (res.jobs.job_assignee && res.jobs.job_assignee !== "-") {
                        apiURLforQuotation = Constants.URL + 'billing/quotation/?qid=' + res.jobs.job_assignee;
                    }
                    else {
                        apiURLforQuotation = Constants.URL + '/billing/quotation/j/' + this.props.match.params.id;
                    }
                    // let apiURLQ = Constants.URL + '/billing/quotation/';
                    console.log(apiURLforQuotation)
                    fetch(apiURLforQuotation)
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            console.log(JSON.stringify(res.quotations));
                            if (res.quotations) {
                                this.setState(
                                    { quotations: res.quotations }
                                );
                            }
                        })
                })

        }
    }

    // getSingleArticle() {
    //     if (this.props.match.params.id) {
    //         if (!this.props.article || (this.props.article._id !== + this.props.match.params.id)) {
    //             this.props.getArticle(this.props.match.params.id);
    //             this.props.getQuotations(this.props.match.params.id);
    //         }
    //     }
    // }

    handleEditArticleClick() {
        this.props.history.replace({ pathname: '/job/edit/' + this.props.match.params.id });
    }

    handleAssignClick(item) {
        this.setState(prevState => {
            return {
                ...prevState,
                jobs: {
                    ...prevState.jobs,
                    job_assignee: item
                }
            };
        });
    }


    handleQuoteClick() {
        console.log("params:" + this.props.match.params.id)
        this.props.history.replace({ pathname: '/quote/add/' + this.props.match.params.id });
    }

    handleDeleteArticleClick() {
        alert('We are deleting your article...');
        this.props.deleteArticle(this.props.match.params.id)
            .then(res => {
                if (res.success) {
                    this.props.history.push('/');
                }
            })
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="jumbotron JobDetail">
                    <h3 >{this.state.jobs.description}</h3>
                    <h5 >Job ID: {this.state.jobs.job_id}</h5>
                    <h5 >Customer ID: {this.state.jobs.job_creator}</h5>
                    <h5 >Quotation ID: {this.state.jobs.job_assignee}</h5>
                    <h5>Date: {this.state.jobs.date}</h5>
                    <h5>Time: {this.state.jobs.time}</h5>
                    {/* {this.props.isAuthenticated && this.props.user_id === this.state.jobs.job_creator
                        && <button
                            className="btn btn-danger"
                            style={{ float: 'right', padding: '6px 12px' }}
                            onClick={() => this.handleDeleteArticleClick()}>Delete</button>}
                    {this.props.isAuthenticated && this.props.user_id === this.state.jobs.job_creator
                        && <WrappedLink
                            to={"/article/edit/" + this.props.match.params.id}
                            buttonClasses={['btn', 'btn-info', 'mr-2']}
                            click={() => this.handleEditArticleClick()}>Edit</WrappedLink>} */}
                    {this.props.isAuthenticated && this.state.jobs.job_assignee == '-' && this.props.user_id != this.state.jobs.job_creator
                        && <WrappedLink
                            to={"/quote/add/" + this.props.match.params.id}
                            buttonClasses={['btn', 'btn-info', 'mr-2']}
                            click={() => this.handleQuoteClick()}>Quote</WrappedLink>}
                </div>
                <div>
                    {/* <ListQuotation job_id={this.props.article.job_id}/> */}
                </div>
                <div className="container">
                    {/* HELLO{this.props.job_id} */}

                    <Table selectable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Quotation ID</Table.HeaderCell>
                                <Table.HeaderCell>Comment</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>No of workers</Table.HeaderCell>
                                <Table.HeaderCell>Wage hourly</Table.HeaderCell>
                                <Table.HeaderCell>Total Price</Table.HeaderCell>
                                <Table.HeaderCell>Trader ID</Table.HeaderCell>
                                <Table.HeaderCell>Assign</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.quotations.map(quotation => {
                                    return (
                                        <Table.Row key={quotation.qid} >
                                            <Table.Cell>
                                                {quotation.qid}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.comment}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.date}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.status}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.no_of_workers}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.wage_hr}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.total_price}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {quotation.tradieid}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {this.props.isAuthenticated && this.state.jobs.job_assignee === '-' && this.props.user_id !== quotation.tradieid
                                                    && <WrappedLink
                                                        // to={"/job/assign/" + quotation.qid}
                                                        buttonClasses={['btn', 'btn-info', 'mr-2']}
                                                        click={() => this.handleAssignClick(quotation.qid)}>Assign</WrappedLink>}
                                                {this.state.jobs.job_assignee !== '-' && this.state.jobs.job_assignee == quotation.qid
                                                    && <button disabled="false"
                                                        className="btn btn-danger"
                                                        style={{ float: 'right', padding: '6px 12px' }}
                                                    >Assigned</button>}
                                                {/* {this.state.jobs.job_assignee == quotation.qid ? 'Assigned':''} */}
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
                <br />
                <div className="container">
                    {this.state.jobs.job_assignee !== '-'
                        && <WrappedLink
                            to={"/job/invoice/" + this.state.jobs.job_id}
                            buttonClasses={['btn', 'btn-info', 'mr-2']}
                            click={() => this.handleInvoiceClick()}>Invoice</WrappedLink>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // article: state.articles.article,
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername,
        user_id: state.users.user_id,
        // quotations: state.articles.quotations,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getArticle: (articleId) => dispatch(getArticle(articleId)),
        // deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
        // getQuotations: (job_id) => dispatch(getQuotations(job_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);