# AJV EXPRESS VALIDATOR

This library takes a declarative approach in validating http request data using JSON Schema and the AJV library.


#### HOW TO USE

1. Install the npm package

> ` npm install ajv-express-validator`

2. Define your JSON Schema 

```js

const schema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'number' },
    },
    required: ['email', 'password',],

  },
  params: {
    type: 'object',
    properties: {
      loginId: { type: 'string'}
    },
    required: ['loginId']
  },
  query: {
    type: 'object',
    properties: [
      referred: { type: 'boolean'}
    ],
    required: ['referred']
  }
}

 ```

Alternatively you can also use the `fluent-json-schema` lib


```js

import S from "fluent-json-schema";

const schema = {
  body: S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().required())
  .valueOf();
}

```
3. Add the middleware to your route

```js

const validate = require("ajv-express-validator");
const loginSchema = require("./loginSchema");

router.get(
  '/login',
  validate(loginSchema),
  controller.login,
)

```
4. Handle Errors in express error handler

```js
app.use((err, req, res, next) => { 
  if (err.isBoom) {
    res.status(err.output.statusCode);
    return res.json(err);
  }

//...
});




```
