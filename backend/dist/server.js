"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const checkout_route_1 = require("./checkout.route");
function initServer() {
    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.route('/').get((req, res) => {
        res.status(200).send('<h1>API is up and running</h1>');
    });
    const PORT = process.env.PORT || 9000;
    app.route('/api/checkout').post(bodyParser.json(), checkout_route_1.createSession);
    app.route('/hooks').post(bodyParser.json(), checkout_route_1.getCheckoutSession);
    app.listen(PORT, () => {
        console.log('HTTP REST API SERVER IS UP AND RUNNING AT PORT ' + PORT);
    });
}
exports.initServer = initServer;
//# sourceMappingURL=server.js.map