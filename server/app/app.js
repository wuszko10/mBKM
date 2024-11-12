import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes';

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(express.static('public'));

app.use(cors());

mongoose.connect(config.databaseUrl, { useNewUrlParser: true })
  .then(() => console.info('Connect with database established'))
  .catch(error => console.error('Database connection error:', error)); //połączenie z bazą

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
}); //zamykanie połączenia z bazą


routes(app); //trasy serwera

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
}); //obługa nieznanych tras (kierowanie na stronę główną serwera)

app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
}); //uruchomienie serwera