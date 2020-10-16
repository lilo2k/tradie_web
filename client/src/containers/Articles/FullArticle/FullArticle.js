import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle, deleteArticle, getQuotations } from '../../../store/actions/articlesActions';
import WrappedLink from '../../../components/WrappedLink/WrappedLink';
import { Table } from 'semantic-ui-react';

import './FullArticle.css'
// import ListQuotation from '../../Quotation/ListQuotations/ListQuotation';

class FullArticle extends Component {
    componentDidMount() {
        this.getSingleArticle();
    }

    getSingleArticle() {
        if (this.props.match.params.id) {
            if (!this.props.article || (this.props.article._id !== + this.props.match.params.id)) {
                this.props.getArticle(this.props.match.params.id);
                this.props.getQuotations(this.props.match.params.id);
            }
        }
    }

    handleEditArticleClick() {
        this.props.history.replace({ pathname: '/article/edit/' + this.props.match.params.id });
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
                <div className="jumbotron FullArticle">
                    <h3 >{this.props.article.title}</h3>
                    <h5 >Job ID: {this.props.article._id}</h5>
                    <h5 >Customer: {this.props.article.author}</h5>
                    <h5>Date: {this.props.article.work_date}</h5>
                    <h5>Time: {this.props.article.work_time}</h5>
                    {this.props.isAuthenticated && this.props.authenticatedUsername === this.props.article.author
                        && <button
                            className="btn btn-danger"
                            style={{ float: 'right', padding: '6px 12px' }}
                            onClick={() => this.handleDeleteArticleClick()}>Delete</button>}
                    {this.props.isAuthenticated && this.props.authenticatedUsername === this.props.article.author
                        && <WrappedLink
                            to={"/article/edit/" + this.props.match.params.id}
                            buttonClasses={['btn', 'btn-info', 'mr-2']}
                            click={() => this.handleEditArticleClick()}>Edit</WrappedLink>}
                    {this.props.isAuthenticated && this.props.authenticatedUsername !== this.props.article.author
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
        getArticle: (articleId) => dispatch(getArticle(articleId)),
        deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
        getQuotations: (job_id) => dispatch(getQuotations(job_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);