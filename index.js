/* eslint-disable array-callback-return */
const { badRequest } = require('@hapi/boom');
const Ajv = require('ajv');

const validate = (schema) => function validateRequest(req, res, next) {
  const toValidate = {};
  const errors = [];

  if (!schema) {
    return next();
  }

  ['params', 'body', 'query'].forEach((key) => {
    if (schema[key]) {
      toValidate[key] = req[key];
    }
  });

  const ajv = new Ajv();

  Object.keys(toValidate).map((key) => {
    const ajvValidate = ajv.compile(schema[key]);

    const valid = ajvValidate(toValidate[key]);

    if (!valid) {
      const error = ajvValidate.errors[0];

      const errorMessage = `${error.instancePath} ${error.message}`;

      error.errorMessage = errorMessage;
      errors.push(error);
    }
  });

  if (errors.length) {
    return next(badRequest('Validation Error', errors));
  }

  return next();
};

module.exports = validate;
