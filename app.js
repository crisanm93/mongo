const express = require('express');
const bodyParser =  require('body-parser');
const app = express()
const port = 3000

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));
/* parse application/json */
app.use(bodyParser.json());

/* conexion a la base de datos mongodb */
const mongoose = require('mongoose');

const usuario = "crismongo-";
const password = "moreno2024_";
const dbName = "veterinaria";

//const uri = `mongodb+srv://${usuario}:${password}@cluster0.youbeub.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=cluster0`;
const uri = `mongodb+srv://crismongo-:moreno2024_@cluster0.youbeub.mongodb.net/veterinaria?retryWrites=true&w=majority&appName=cluster0`;

mongoose.connect(uri)
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e=> console.log('error de conexión', e))

/* establecer el motor de plantillas ejs */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


/* midleware -- archivos estaticos dirname es la ruta de nuestro proyecto */   
app.use(express.static(__dirname + "/public"));

/* rutas Web */
app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/mascotas'));


  /* direccionar a vista 404 */
app.use((req, res, next) => {
    // res.status(404).sendFile(__dirname + "/public/404.html");
    res.status(404).render("404", { 
      titulo: "Error 404",
      descripcion: "Página No Encontrada"
    });
});

  app.listen(port, () => {
  console.log(`Ejemplo de aplicacion, escuchando en el puerto ${port}`)
})