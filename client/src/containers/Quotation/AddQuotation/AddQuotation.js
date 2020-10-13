import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveQuotation } from '../../../store/actions/articlesActions';
// import {  } from '../../../store/actions/quotationActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import InputField from '../../../components/InputField/InputField';

const FIELDS = [
    { name: '_id', type: 'text', label: 'Job ID', disabled: 'disabled' },
    { name: 'title', type: 'text', label: 'Job', },
    { name: 'author', type: 'text', label: 'Customer', disabled: 'disabled' },
    { name: 'work_date', type: 'text', label: 'Date', disabled: 'disabled' },
    { name: 'work_time', type: 'text', label: 'Time', disabled: 'disabled' },
    { name: 'workers', type: 'text', label: 'Number of workers' },
    { name: 'wage', type: 'text', label: 'Hourly wage' },
    { name: 'hours', type: 'text', label: 'Work hours' },
    { name: 'price', type: 'text', label: 'Total Price' },
];

class AddQuotation extends Component {
    state = {
        article: {},
        errors: {}
    };

    componentWillMount() {
        const articleId = this.props.match.params.id;
        let article, errors;
        if (localStorage.getItem('Edit' + articleId) === null) {
            localStorage.setItem('Edit' + articleId, JSON.stringify({ article: this.props.article, errors: {} }));
            article = this.props.article;
            errors = {};
        } else {
            article = JSON.parse(localStorage.getItem('Edit' + articleId)).article;
            errors = JSON.parse(localStorage.getItem('Edit' + articleId)).errors;
        }

        this.setState(prevState => {
            return {
                ...prevState,
                article: { ...article },
                errors: { ...errors }
            };
        });
    }

    handleValidation = (field, value) => {
        let error = {};
        if (value === '') {
            error[field] = 'This field is required';
        } else {
            error[field] = '';
        }
        return error;
    }

    handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const errors = { ...this.state.errors, ...this.handleValidation(field, value) }
        this.setState((prevState) => {
            console.log(this.props.user_id);
            return {
                ...prevState,
                article: {
                    ...prevState.article,
                    [field]: value,
                },
                errors: { ...errors }
            };
        }, () => localStorage.setItem('Edit' + this.state.article._id, JSON.stringify(this.state)));
    }

    handleAddQuoteSubmit = (e) => {
        e.preventDefault();
        console.log("add quotation");
        let errors = { ...this.state.errors };
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if (!formValuesValid) {
            return;
        } else {
            console.log(this.state.article);
            console.log(this.props.user_id);
            console.log(this.props.authenticatedUsername);
            this.setState((prevState) => {
                return {
                    ...prevState,
                    article: {
                        ...prevState.article,
                        trader_user_id: this.props.user_id
                    }
                };
            }, () => {
                this.props.saveQuotation(this.state.article)
                    .then(res => {
                        if (res.errors) {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    article: { ...prevState.article },
                                    errors: { ...prevState.errors, ...res.errors }
                                };
                            });
                        } else {
                            localStorage.removeItem('Edit' + this.props.match.params.id);
                            this.props.history.push('/articles/' + this.props.match.params.id);
                        }
                    });
            });
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('Edit' + this.props.match.params.id);
    }

    render() {
        const inputFields = FIELDS.map(field =>
            <InputField key={field.name}
                type={field.type} name={field.name} label={field.label}
                defaultValue={this.state.article[field.name]} disabled={field.disabled}
                errors={this.state.errors}
                onChange={this.handleInputChange} />
        );
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Create Quotation</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleAddQuoteSubmit}>
                        {inputFields}
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="body" style={{ height: '200px' }}
                                className="form-control"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.article.body} />
                            {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
                        </div>
                        <button className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.article,
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername,
        user_id: state.users.user_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveQuotation: (articleId, articleData) => dispatch(saveQuotation(articleId, articleData))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddQuotation));
