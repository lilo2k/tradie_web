import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import * as Constants from '../../Constants'
import { Link } from 'react-router-dom';
import { useHistory, useParams } from "react-router-dom";
import WrappedLink from '../../components/WrappedLink/WrappedLink';

class Home extends Component {
    state = {
        jobs: [],
        res: ''
    }

    getAllJobs() {
        let apiURL = Constants.URL + 'jobs';
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
            })

        //     axios
        //   .get(Constants.URL + "/search/filter")
        //   .then((res) => {
        //     if (res.data) {
        //       this.setState(
        //         {jobs: data}
        //       );
        //       // this.setState({ title: "", author: "", fromYear: year-10, toYear:currentYear, method: "", claims: [] });
        //     }
        //   })
        //   .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getAllJobs();
    }

    componentDidMount() {
    }

    handleClick = itemId => {
        let history = useHistory();
        history.push('/job/' + itemId);
    };

    render() {
        let jobs = this.state.jobs;

        const showArticlesLink = <WrappedLink
            to={this.state.showMyArticles ? "/" : "/article/myarticles"}
            buttonClasses={['btn', 'btn-outline-info', 'mr-3', 'MyArticlesButton']}
            onClick={this.toggleShowMyArticles}>
            {this.state.showMyArticles ? 'All Jobs' : 'My Jobs'}
        </WrappedLink>

        return (
            <div className="container">
                <br />
                <div className="Header">
                    <h1 style={{ display: 'inline-block' }}>Job list</h1>
                    <WrappedLink to="/article/add" buttonClasses={['btn', 'btn-primary', 'mr-3', 'AddArticleButton']}>Add Job</WrappedLink>
                    {/* {this.props.isAuthenticated && showArticlesLink} */}
                </div>
                <br />
                <div>
                    <section className="jumbotron">
                        <Table selectable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Job ID</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Time</Table.HeaderCell>
                                    <Table.HeaderCell>Creator</Table.HeaderCell>
                                    <Table.HeaderCell>State</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    !jobs || jobs.length <= 0 ?
                                        (
                                            <Table.Row>
                                                <Table.Cell colSpan='6'>
                                                    No job found
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                        :
                                        (
                                            jobs.map(job => {
                                                // data.map(({_id, title, author, year, method, claims, evidence}) => {
                                                // data.map(job => {
                                                return (
                                                    <Table.Row key={job.job_id}>
                                                        <Table.Cell>
                                                            {job.job_id}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Link to={'/job/' + job.job_id}>
                                                                {job.description}
                                                            </Link>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {job.date}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {job.time}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {job.job_creator}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {job.state}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                        )
                                }
                            </Table.Body>
                        </Table>
                    </section>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // this.props   ==> dispatch to actions 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
