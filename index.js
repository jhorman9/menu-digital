const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/utils/database.js');
const initModels = require('./src/models/initModels.js');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

db.authenticate()
    .then(() => console.log('Base de datos conectada correctamente'))
    .catch((err) => console.log(err));

initModels();

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Bienvenidos al servidor del menu digital',
    });
});

app.listen(port, () => {
  console.log(`El servidor escuchando en el puerto: ${port}`);
});