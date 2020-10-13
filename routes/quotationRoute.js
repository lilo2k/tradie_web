const express = require('express');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

const config = require('../config.js');
const Quotation = require('../models/quotationModel.js');

let router = express.Router();

const checkForErrors = ({ job_id, hours, price }) => {
    let errors = {};
    let isValid = false;
    if (job_id === '') {
        errors = { ...errors, title: 'This field is required' }
    }
    if (hours === '') {
        errors = { ...errors, author: 'This field is required' }
    }
    if (price === '') {
        errors = { ...errors, body: 'This field is required' }
    }

    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }
    isValid = true;
    return { isValid, errors };
}

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    if (authorizationToken) {
        jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                req.authorId = decoded.id;
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}

router.get('/byJobId/:job_id', (req, res, next) => {
    // Quotation.findById(req.params.job_id, (err, article) => {
    //     if (err) throw err;
    //     res.json({ article });
    // })

    // seerSearchJson(title, author, yearSelection, fromYear, toYear, method, claims)
    //     .then((data) => res.json(data))
    //     .catch(next);

    let query = Quotation.find(
        {
            job_id: req.params.job_id,
        }
    );
    // sorting
    query = query.sort({ _id: 'descending' });

    query.then((data) => res.json({data}))
        .catch(next);
});

router.post('/add', isAuthenticated, (req, res) => {
    // job_id, wage, price, workers, description, hours
    const job_id = req.body.job_id || '';
    const workers = req.body.workers || '';
    const wage = req.body.wage || '';
    const hours = req.body.hours || '';
    const price = req.body.price || '';
    const description = req.body.description || '';
    const trader_user_id = req.body.trader_user_id || '';

    const { isValid, errors } = checkForErrors({ job_id, hours, price });

    if (isValid) {
        const newQuote = new Quotation({
            job_id: job_id,
            workers: workers,
            wage: wage,
            hours: hours,
            price: price,
            description: description,
            trader_user_id: trader_user_id
        });

        newQuote.save((err) => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    } else {
        res.json({ errors });
    }
});

module.exports = router;