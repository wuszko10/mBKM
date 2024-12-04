import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes';
import {loadMetadataMiddleware} from "./middleware/cacheUpdater";
import NodeCache from "node-cache";

// const cache = new NodeCache({ stdTTL: 86400 });
const cache = new NodeCache({ stdTTL: 300 });

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(express.static('public'));

app.use(cors());

app.locals.cache = cache;

app.use(loadMetadataMiddleware);

mongoose.connect(config.databaseUrl, { useNewUrlParser: true })
  .then(() => console.info('Connect with database established'))
  .catch(error => console.error('Database connection error:', error));

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

routes(app);


app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
});


