require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
require('@babel/register');
require('./app/app');
