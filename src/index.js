const createApp = require('./app');

const port = process.env.PORT || 3000;
const app = createApp();

/*
¿Por qué se ha quitado todo el código para crear el servidor
y se ha colocado en un nuevo archivo?

Esto sirve para poder reutilizar el código de creación de
servidor y así poder utilizarlo también en la zona de pruebas
*/

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
