// middlewares/logger.js

// импортируем нужные модули
const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});


module.exports = {
  requestLogger,
  errorLogger,
};

//А затем импортировать в app.js:
const { requestLogger, errorLogger } = require('./middlewares/logger');


app.use(requestLogger);
//...
app.use(errorLogger); // подключаем логгер ошибок


//gitignore
//*.log