const express = require('express');
const app = express();

const { config } = require('./config');
const platziStore = require('./routes/index');
const auhtapi = require('./routes/auth');
const {logErrors,  errorHandler,  wrapErrors} = require('./utils/middleware/eerorHandler');

app.use(express.json());

app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});

auhtapi(app);
platziStore(app);

/*Gestion De Errores*/ 
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});