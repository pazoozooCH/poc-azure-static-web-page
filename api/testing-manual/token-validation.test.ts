// Manual code to test JWT token handling. Run with:
// - npm run watch
// - node .\dist\testing-manual\token-validation.test.js

import {
  decode,
  verify
} from 'jsonwebtoken';
const fetch = require('node-fetch');

const token = process.env.TOKEN;

if (!token) {
  throw new Error("Please set env variable TOKEN");
}

console.log("Decoding...", decode(token));

const openidConfUrl = "https://login.microsoftonline.com/5a35dd12-2027-4c00-b63a-cc5076fec4b9/v2.0/.well-known/openid-configuration";

console.log("Verifying...");

fetch(openidConfUrl)
    .then(res => res.text())
    .then(body => JSON.parse(body))
    .then(config => fetch(config.jwks_uri))
    .then(res => res.text())
    .then(body => JSON.parse(body))
    .then(keys => console.log(keys));

// console.log("Getting public key");


// console.log("Verifying...", verify(token));
