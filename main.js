const App = require('./app');

const PORT =8000; //Depende del puerto que se encuentre disponible en la instancia EC2

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo correctamente en el puerto ${PORT}`);
});