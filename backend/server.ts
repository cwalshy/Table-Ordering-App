import * as express from 'express';
import {Application} from 'express';
import {getCheckoutSession, createSession} from './checkout.route';

export function initServer() {
    const app: Application = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());   

    app.route('/').get((req, res) => {
        res.status(200).send('<h1>API is up and running</h1>');
    });
    const PORT = process.env.PORT || 9000;

    app.route('/api/checkout').post(bodyParser.json(), createSession);



    app.route('/hooks').post(bodyParser.json(), getCheckoutSession);

    app.listen(PORT, () => {
        console.log('HTTP REST API SERVER IS UP AND RUNNING AT PORT ' + PORT);
    });
}
  