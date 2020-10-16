import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { saveQuotation } from '../../../store/actions/articlesActions';
// import {  } from '../../../store/actions/quotationActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import InputField from '../../../components/InputField/InputField';

import * as Constants from '../../../Constants'

const FIELDS = [
    { name: 'job_id', type: 'text', label: 'Job ID', disabled: 'disabled' },
    { name: 'comment', type: 'text', label: 'Comment' },
    { name: 'item1', type: 'text', label: 'Item1' },
    { name: 'no_of_workers', type: 'text', label: 'No of workers' },
    { name: 'qty1', type: 'text', label: 'Item1 quantity' },
    { name: 'total_price', type: 'text', label: 'Total Price' },
    { name: 'wage_hr', type: 'text', label: 'Hourly wage' },
    { name: 'status', type: 'text', label: 'Status', disabled: 'disabled'  },
    { name: 'tradieid', type: 'text', label: 'Traide ID', disabled: 'disabled'  },
];

class AddQuotation extends Component {
    state = {
        // article: {},
        errors: {},
        // job_id: '',
        // comment: '',
        // item1: '',
        // no_of_workers: '',
        // qty1: '',
        // status: '',
        // total_price: '',
        // tradieid: '',
        // wage_hr: '',
        quotation: {}
    };

    options = (data) => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        };
    };

    componentWillMount() {
        // const articleId = this.props.match.params.id;
        // let article, errors;
        // if (localStorage.getItem('Edit' + articleId) === null) {
        //     localStorage.setItem('Edit' + articleId, JSON.stringify({ article: this.props.article, errors: {} }));
        //     article = this.props.article;
        //     errors = {};
        // } else {
        //     article = JSON.parse(localStorage.getItem('Edit' + articleId)).article;
        //     errors = JSON.parse(localStorage.getItem('Edit' + articleId)).errors;
        // }

        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         article: { ...article },
        //         errors: { ...errors }
        //     };
        // });

        console.log(this.props.user_id)
        console.log(this.props.authenticatedUsername)
        // console.log(jwt.decode(localStorage.getItem('jwtToken')).user_id)
        this.setState({
            quotation: {
                job_id: this.props.match.params.id,
                tradieid: this.props.user_id,
                status: 0
            }
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
            return {
                ...prevState,
                quotation: {
                    ...prevState.quotation,
                    [field]: value
                },
                errors: { ...errors }
            };
        })
        // , () => localStorage.setItem('Edit' + this.state.article._id, JSON.stringify(this.state)));
    }

    handleAddQuoteSubmit = (e) => {
        e.preventDefault();
        // console.log("add quotation");
        let errors = { ...this.state.errors };
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if (!formValuesValid) {
            return;
        } else {
            console.log(this.props.user_id);
            console.log(this.props.authenticatedUsername);

            console.log("add quotation");
            // console.log("articleid:" + articleId);
            console.log(this.state.quotation);
            // .then(res => res.json())
            // .then()

            this.setState((prevState) => {
                return {
                    ...prevState,
                    quotation: {
                        ...prevState.quotation,
                        // trader_user_id: this.props.user_id
                    }
                };
            }, () => {
                // this.props.saveQuotation(this.state.article)
                fetch(Constants.URL + 'billing/quotation/', this.options(this.state.quotation))
                    .then(res => {
                        if (res.errors) {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    quotation: { ...prevState.quotation },
                                    errors: { ...prevState.errors, ...res.errors }
                                };
                            });
                        } else {
                            // localStorage.removeItem('Edit' + this.props.match.params.id);
                            this.props.history.push('/job/' + this.props.match.params.id);
                        }
                    });
            });
        }
    }

    componentWillUnmount() {
        // localStorage.removeItem('Edit' + this.props.match.params.id);
    }

    render() {
        const inputFields = FIELDS.map(field =>
            <InputField key={field.name}
                type={field.type} name={field.name} label={field.label}
                disabled={field.disabled}
                errors={this.state.errors}
                defaultValue={this.state.quotation[field.name]}
                onChange={this.handleInputChange} />
        );
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Create Quotation</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleAddQuoteSubmit}>
                        {/* <InputField label='Job ID'
                            name="job_id"
                            key="job_id"
                            type="text"
                            disabled='true'
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.job_id}
                            placeholder="Job ID"
                        />
                        <InputField label='Comment'
                            name="comment"
                            key="comment"
                            type="text"
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.comment}
                            placeholder="Comment"
                        />
                        <InputField label='Item 1'
                            name="item1"
                            key="item1"
                            type="text"
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.item1}
                            placeholder="Item 1"
                        />
                        <InputField label='No of Workers'
                            name="no_of_workers"
                            key="no_of_workers"
                            type="text"
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.no_of_workers}
                            placeholder="No of Workers"
                        />
                        <InputField label='Item 1 quantity'
                            name="qty1"
                            key="qty1"
                            type="text"
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.qty1}
                            placeholder="Item 1 quantity"
                        />
                        <InputField label='Total Price'
                            name="total_price"
                            key="total_price"
                            type="text"
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.total_price}
                            placeholder="Total Price"
                        />
                        <InputField label='Hourly Wage'
                            name="wage_hr"
                            key="wage_hr"
                            type="text"
                            errors={this.state.errors}
                            onChange={this.handleInputChange}
                            value={this.state.wage_hr}
                            placeholder="Hourly Wage"
                        /> */}
                        {inputFields}
                        {/* <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="body" style={{ height: '200px' }}
                                className="form-control"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.article.body} />
                            {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
                        </div> */}
                        <button className="btn btn-success">Save</button>
                    </form>
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
        user_id: state.users.user_id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // saveQuotation: (articleId, articleData) => dispatch(saveQuotation(articleId, articleData))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddQuotation));
