import * as actionTypes from '../actions/actionTypes'
import jwt from 'jsonwebtoken';

const validCredentials = () => {
    const authorizationToken = localStorage.getItem('jwtToken');
    if (authorizationToken === null)
        return false;
    try {
        jwt.decode(authorizationToken);
        return true;
    } catch(err) {
        return false;
    }
}

const initialState = {
    isAuthenticated: validCredentials(),
    authenticatedUsername: validCredentials() === false ? '' : jwt.decode(localStorage.getItem('jwtToken')).username,
    user_id: validCredentials() === false ? '' : jwt.decode(localStorage.getItem('jwtToken')).user_id
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                isAuthenticated: true,
                authenticatedUsername: action.authenticatedUsername,
                user_id: action.user_id
            }
        case actionTypes.LOGOUT_USER: {
            return {
                isAuthenticated: false,
                authenticatedUsername: '',
                user_id: ''
            }
        }
        default:
            return state;
    }
};

export default reducer;
