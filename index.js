const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());

app.get('/', function (req, res) {
  return res.send('Hello World!');
});

// importa las rutas
app.use(require('./routes/aulas'));
app.use(require('./routes/materias'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});