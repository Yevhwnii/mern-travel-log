require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const middlewares = require('./middlewares');
const logRouter = require('./api/logs');

const app = express();
const port = process.env.PORT || 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hi World',
  });
});

app.use('/api/logs', logRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Listeting on port http://localhost/${port}`);
});
