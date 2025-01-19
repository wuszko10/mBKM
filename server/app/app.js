import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes';
import NodeCache from "node-cache";
import {startCronJobs} from "./service/cronJobs";
import {swaggerDocs, swaggerUi} from "./swagger";
import {loadMetadataMiddleware} from "./middleware/cacheUpdater";

const cache = new NodeCache({ stdTTL: 86400 });

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(express.static('public'));

app.use(cors());

app.locals.cache = cache;
app.use(loadMetadataMiddleware);
mongoose
    .connect(config.databaseUrl, {
        useNewUrlParser: true
    })
    .then(() => console.info('Connect with database established'))
    .catch(error => console.error('Database connection error:', error));

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    } catch (error) {
        console.error('Błąd podczas zamykania połączenia z MongoDB:', error);
        process.exit(1);
    }
});

routes(app);
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, function () {
    console.info(`Server is running at ${config.port}`)
    startCronJobs();
});




