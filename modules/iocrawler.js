/**
 * Created by Koronos on 04/03/2015.
 */
var io = require("socket.io")();
var http = require("http");
var Lector = require("./Lector");

var options = {
    hostname: 'www.informador.com.mx'
};

io.on("connection", function (socket) {
    getLinker(options.hostname, {});
})

function getLinker(pagina, linker) {
    console.log("Haciendo peticion a: " + pagina);
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        console.log("Despues de utf8", res);
        res.on('data', function (chunk) {
            ///////////////////////////////Obtener el siguiente link con un ciclo///////////////////////
            var lector = new Lector(chunk, options);
            io.send(lector);
            while (lector.lastIndex < lector.links.length) {
                var link = lector.getLink();
                if (linker[link] == undefined) {
                    linker[link] = link;
                }
            }
            console.log("recivido el data");
        });
        console.log("terminado la fun");
    });
    console.log("terminado el req");
    req.end();

    //Si el link no lo habia leido antes,crear nuevos niveles dependiendo del link

    //-Y mandar a que getLinker vuelva a trabajar

    //-Si no, continuar

    //Retornar una vez terminado el linker
}


module.exports = io;