import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllArticles, getMyArticles } from '../../store/actions/articlesActions';
import Article from '../../components/Article/Article';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import './Home.css';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class Home extends Component {
    state = {
        showMyArticles: false
    }

    componentWillMount() {
        if (this.props.location.pathname === '/article/myarticles' && !this.state.showMyArticles) {
            this.toggleShowMyArticles();
        }
    }

    componentDidMount() {
        this.props.initArticles();
        if (this.props.isAuthenticated) {
            this.props.getMyArticles();
        }
    }

    toggleShowMyArticles = () => {
        this.setState((prevState) => {
            return {
                showMyArticles: !prevState.showMyArticles
            }
        });
    }

    render() {
        let allArticles = this.props.allArticles || JSON.parse(localStorage.getItem('BasicMERNStackAppAllArticles'));
        allArticles = allArticles.map(article => (
            <Article
                job_id={article.job_id}
                key={article._id}
                id={article._id}
                title={article.title}
                work_date={article.work_date}
                work_time={article.work_time}
                job_creator={article.author}
            />
        ));

        let myArticles = [];
        if (this.props.isAuthenticated && this.state.showMyArticles) {
            if (this.props.myArticles) {
                myArticles = [...this.props.myArticles];
            } else {
                myArticles = [...JSON.parse(localStorage.getItem('BasicMERNStackAppMyArticles'))]
            }
            myArticles = myArticles.map(article => (
                <Article
                    job_id={article.job_id}
                    key={article._id}
                    id={article._id}
                    title={article.title}
                    work_date={article.work_date}
                    work_time={article.work_time}
                    job_creator={article.author}
                />
            ));
        }

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
                    {this.props.isAuthenticated && showArticlesLink}
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
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.showMyArticles ? myArticles : allArticles}
                            </Table.Body>
                        </Table>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allArticles: state.articles.articles,
        myArticles: state.articles.myArticles,
        isAuthenticated: state.users.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initArticles: () => dispatch(getAllArticles()),
        getMyArticles: () => dispatch(getMyArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
