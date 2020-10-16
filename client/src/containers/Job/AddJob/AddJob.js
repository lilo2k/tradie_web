import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitNewJob } from '../../../store/actions/jobsActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import InputField from '../../../components/InputField/InputField';

import {
    Dropdown,
    Grid,
    Button,
    Radio,
    Form,
    Input,
    Checkbox
} from 'semantic-ui-react'

const FIELDS = [
    // { name: 'description', type: 'text', label: 'Description' },
    { name: 'creator_id', type: 'text', label: 'Customer ID', disabled: 'disabled' },
    { name: 'date', type: 'text', label: 'Date', placeholder: "dd/mm/yyyy" },
    { name: 'time', type: 'text', label: 'Time', placeholder: "hh:mm-hh:mm" }
];

class AddJob extends Component {
    state = {
        job: {},
        errors: {}
    };

    componentWillMount() {
        if (localStorage.getItem('AddJobPage') !== null) {
            const { job, errors } = JSON.parse(localStorage.getItem('AddJobPage'));
            this.setState(prevState => {
                return {
                    ...prevState,
                    job: { ...job },
                    errors: { ...errors }
                };
            });
        }
        else {
            this.setState({
                job: {
                    creator_id: this.props.user_id
                }
            })
        }
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
                job: {
                    ...prevState.job,
                    [field]: value
                },
                errors: { ...errors }
            };
        }, () => localStorage.setItem('AddJobPage', JSON.stringify(this.state)));
    }

    componentWillUnmount() {
        localStorage.removeItem('AddJobPage');
    }

    handleNewJobSubmit = (e) => {
        e.preventDefault();
        let errors = { ...this.state.errors };
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if (!formValuesValid) {
            return;
        } else {
            this.props.submitNewJob(this.state.job)
                .then(res => {
                    if (res.errors) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                job: { ...prevState.job },
                                errors: { ...prevState.errors, ...res.errors }
                            };
                        });
                    } else {
                        this.props.history.push('/');
                    }
                })
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        const inputFields = FIELDS.map(field =>
            <InputField key={field.name}
                type={field.type} name={field.name} label={field.label}
                disabled={field.disabled}
                errors={this.state.errors}
                defaultValue={this.state.job[field.name]}
                placeholder={field.placeholder}
                onChange={this.handleInputChange} />
        );
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Add Job</h3>
                <div className="jumbotron">
                    <Form onSubmit={this.handleNewJobSubmit}>
                        {/* <Form.Group widths={8}> */}
                            {/* <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description" style={{ height: '200px' }}
                                    className="form-control" placeholder="Description"
                                    onChange={this.handleInputChange}
                                    defaultValue={this.state.job.description} />
                                {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
                            </div> */}
                            <InputField key="description"
                            type="text" name="description" label="Description"
                            errors={this.state.errors}
                            onChange={this.handleInputChange} /> 
                        {/* </Form.Group> */}
                        <Form.Group>

                            {/* <InputField key={FIELDS[0].name}
                            type={FIELDS[0].type} name={FIELDS[0].name} label={FIELDS[0].label}
                            defaultValue={this.state.article.title}
                            errors={this.state.errors}
                            onChange={this.handleInputChange} />
                            <InputField key={FIELDS[1].name}
                            type={FIELDS[1].type} name={FIELDS[1].name} label={FIELDS[1].label}
                            defaultValue={this.props.authenticatedUsername} disabled={FIELDS[1].disabled}
                            errors={this.state.errors}
                            onChange={this.handleInputChange} /> */}

                            {inputFields}
                        </Form.Group>
                        
                        <button className="btn btn-success">Submit</button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername,
        user_id: state.users.user_id
    };
}

const mapDispatchToProps = dispatch => {
    return {
        submitNewJob: (jobData) => dispatch(submitNewJob(jobData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
