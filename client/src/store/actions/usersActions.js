import * as actionTypes from './actionTypes'
import jwt from 'jsonwebtoken';
let base64 = require('base-64');

const options = data => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const checkUserUniqueness = ({ field, value }) => {
    return dispatch => {
        return fetch('/api/users/validate', options({ field, value }))
    }
}

export const userSignupRequest = (userSignupDetails) => {
    return dispatch => {
        return fetch('/api/users/signup', options(userSignupDetails))
    }
}
export const userLoginRequest_old = (userLoginDetails) => {

    return dispatch => {
        return fetch('/api/users/login', options(userLoginDetails))
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.success) {
                    const token = res.token;
                    delete res.token;
                    localStorage.setItem('jwtToken', token);
                    console.log(jwt.decode(token).user_id);
                    dispatch({
                        type: actionTypes.LOGIN_SUCCESSFUL,
                        authorizationToken: token,
                        authenticatedUsername: jwt.decode(token).username,
                        user_id: jwt.decode(token).user_id
                    });
                }
                return res;
            })
    }
}

export const userLoginRequest = (userLoginDetails) => {
    return dispatch => {

        let url = 'https://cors-anywhere.herokuapp.com/https://tradies.live/login';
        let username = userLoginDetails.username;
        let password = userLoginDetails.password;

        let headers = new Headers();

        //headers.append('Content-Type', 'text/json');
        headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        // return fetch('https://tradies.live/api/users/login', options(userLoginDetails))
        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "expires_in": 3600,
                "token_type": "jwt"
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // if (res.success) {
                    const token = res.token;
                    delete res.token;
                    localStorage.setItem('jwtToken', token);
                    console.log(jwt.decode(token).userid);
                    dispatch({
                        type: actionTypes.LOGIN_SUCCESSFUL,
                        authorizationToken: token,
                        authenticatedUsername: jwt.decode(token).userid,
                        user_id: jwt.decode(token).userid
                    });
                // }
                return res;
            }).catch(err => {
                console.log(err);
                throw err;
            });
    }
}

export const userLogoutRequest = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('BasicMERNStackAppMyArticles');
        dispatch({ type: actionTypes.LOGOUT_USER });
    }
}