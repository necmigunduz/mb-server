'use strict';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import jwtVerifier from './jwtVerifier';