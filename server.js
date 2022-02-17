'use strict';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import jwtVerifier from './jwtVerifier';

const start = function(options){
    return new Promise(function(resolve, reject){
        process.on("unhandledRejection", (reason, p) => {
            console.log("Unhandled rejection at: Promise", p, "reason:", reason)
        });

        if(!options.port) {
            reject(new Error("No port is specified!"))
        };

        const app = express();

        app.use(function(error, request, response, next){
            console.log(error);
            reject(new Error("Something went wrong!" + error));
            response.status(500).send("Something wen wrong!");
        });

        const schema = buildSchema(`
            type Product {
                id: Int
                brand: String
                productName: String
                color: String
                description: String
                price: String
                amount: Int
            },
            type Products{
                products: [Product]
            },
            type Query {
                employees: Employees,
                employee(id: Int!): Employee
            }
        `);

        const root = {
            employees: () => {
                return data
            },
            employee: (i) => {
                return data.employees.filter((r) => r.id == i.id)[0]
            }
        };

        app.use("/mb-graphql", ensureAuthenticated, graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));

        const server = app.listen(options.port, function(){
            resolve(server);
        });
    });
};

function ensureAuthenticated (request, response, next) {
    return jwtVerifier(request, response, next);
};

const data = {
    "products": [
        {
            "id": 1,
            "brand": "Nokia",
            "productName": "N11",
            "color": "red",
            "description": "Made in Finland",
            "price": 145,
            "amount": 3
        }
    ]
};

module.exports = Object.assign({}, { start });