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
  throw new Error("Please set env variable TOKEN to contain the ID token to verify");
}

const {header, payload} = decode(token, {complete: true});
console.log("Decoded:", header, payload);

//const openidConfUrl = "https://login.microsoftonline.com/5a35dd12-2027-4c00-b63a-cc5076fec4b9/v2.0/.well-known/openid-configuration";
// # ID for ics-portal
const openidConfUrl = "https://login.microsoftonline.com/0555ccbb-73e1-4617-aea4-74c63bef3918/v2.0/.well-known/openid-configuration";

const kid = header.kid;

console.log("Verifying for KID", kid);

async function doVerify() {
  const config = await fetch(openidConfUrl)
    .then(res => res.text())
    .then(body => JSON.parse(body));

  const jwksUri = config.jwks_uri;
  const jwks = await fetch(jwksUri)
    .then(res => res.text())
    .then(body => JSON.parse(body));
  const keys = jwks.keys;
  console.log('##keys', keys);
  const signingKey = keys.find(key => key.kid === kid);
  console.log('##signingKey', signingKey);

  const key = `-----BEGIN CERTIFICATE-----\n${signingKey.x5c[0]}\n-----END CERTIFICATE-----`
  console.log('##key', key);

  console.log("Verifying...", verify(token, key));//, {algorithms: ['RS256']}));
}

doVerify();

