require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
require('babel-core/register');
require('./app/app');