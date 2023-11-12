const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./utils/logger');


dotenv.config();

const app = express();

app.use(cors({ origin: [process.env.APP_DOMAIN, process.env.ADMIN_APP_DOMAIN] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/public')));

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('✅ Connected to DB');
    server.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err.message);
  });