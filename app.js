const express = require('express');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use('/api', apiRoutes);

const sendJSONResponse = (res, status, data, method, message) => {
  res.status(status);
  res.json({
    status,
    method,
    message,
    data,
  });
};

app.use((req, res, next) => {
  const err = new Error('We apologize, there seems to be a problem with your request.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { //eslint-disable-line

  if (err.isBoom) {
    res.status(err.output.statusCode);
    return res.json({ error: err.data[0].errorMessage });
  }

  if (err.status === 404) {
    return sendJSONResponse(res, err.status, null, req.method, 'We apologize, there seems to be a problem with your request.');
  }

  return sendJSONResponse(res, 500, null, req.method, err.message);
});

app.listen(5000, () => console.log('RUNNING'));
