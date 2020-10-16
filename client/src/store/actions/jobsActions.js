import * as actionTypes from './actionTypes';
import * as Constants from '../../Constants'

const options = (data) => {
    console.log(JSON.stringify(data))
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

export const submitNewJob = (jobData) => {
    return dispatch => {
        return fetch(Constants.URL + 'jobs', options(jobData))
        .then(res => res.json())
    }
};