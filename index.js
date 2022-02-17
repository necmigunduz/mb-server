'use strict';
import dotenv from 'dotenv';
import server from './server';

const port = process.env.APP_BASE_PORT || 4000;

server.start({
    port: port
}).then(app => {
    console.log("App is running on port" + port)
});