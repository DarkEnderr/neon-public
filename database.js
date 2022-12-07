const Keyv = require('keyv');
require('dotenv').config();
const db = new Keyv(process.env.MONGODB);

module.exports = db;