const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (process.env.CON == undefined) {
    console.log('No environment value for MongoDB connection string found');
    require('dotenv').config();
}

const connection = process.env.CON;

module.exports = {
    // jwtSecret: JWTSECRET,
    jwtSecret: 'somesecretkeyforjwt',
    // mongodburi: 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@ds233763.mlab.com:33763/basic-mern-stack-app'
    mongodburi: connection
};