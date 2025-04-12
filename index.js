const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/utils/database.js');
const initModels = require('./src/models/initModels.js');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

db.authenticate().then(() => console.log('conexión de base de datos exitoso')).catch((error) => console.log(error));

db.sync({ alter: true }).then(() => console.log('Base de datos sincronizada')).catch((error) => console.log(error));

initModels();

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Bienvenidos al servidor del menu digital',
    });
});

app.listen(PORT, () => {
  console.log(`El servidor escuchando en el puerto: http://localhost:${PORT}`);
});