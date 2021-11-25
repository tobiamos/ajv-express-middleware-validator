const S = require('fluent-json-schema');

const vomitSchema = {
  body: S.object()
    .prop('flavour', S.string().required())
    .prop('price', S.number().required())
    .prop('stock', S.number().required())

    .valueOf(),
};

module.exports = vomitSchema;
