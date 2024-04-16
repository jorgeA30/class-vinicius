const mysql = require('mysql');

//Configuracion de la conexion a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'nombre_de_tu_base_de_datos',
});
//conectar a la base de datos
connection.connect((err)=> {
    if (err) {
        console.error('Error: conexion con la DB fallida', err);
        return;
    }
    console.log('conexion exitosa con la DB');
});

module.exports = connection;
