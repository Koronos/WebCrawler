/**
 * Created by Koronos on 05/03/2015.
 */
function Lector(_cont, options) {
    var _bandera = 0; //Por alguna extraña razon, si indexOf llega al final, vuelve a leer la cadena completa
    var _inicio = 0; //Index inicial para buscar e index donde comienza la palabra
    var _final = 0; //Lugar final de la palabra
    var _enlace = ""; //Enlace en bruto
    var _link = ""; //Link obtenido de la iteracion
    var _contenido = "";
    this._currentLink = 0;

    this.links = []; //Links Obtenidos de la funcion
    this.lastIndex = 0;

    while (_final >= _bandera) {
        //Conseguimos 1 link
        _bandera = _final;
        _inicio = _final;
        _inicio = _cont.indexOf("<a href=\"", _inicio);
        _final = _cont.indexOf("</a>", _inicio) + 4;
        _enlace = _cont.substr(_inicio, _final - _inicio);

        //console.log(enlace);

        //Buscamos cualquier elemento dentro del enlace
        var _inicioEnlace = _enlace.indexOf(">") + 1;
        var _finEnlace = _enlace.indexOf("</a>", _inicioEnlace);
        _contenido = _enlace.substr(_inicioEnlace, _finEnlace - _inicioEnlace);

        //console.log(contenido);
        //Buscamos el Link (Reusamos las variables anteriores)
        _inicioEnlace = _enlace.indexOf("<a href=\"") + 9;
        _finalEnlace = _enlace.indexOf("\"", _inicioEnlace);
        _link = _enlace.substr(_inicioEnlace, _finalEnlace - _inicioEnlace);

        //console.log(link);

        //Si es link comienza con "/", le agregamos el dominio del informador
        if (_link.charAt(0) == "/") {
            _link = options.hostname + _link;
        }

        //Para evitar links desaparecidos por spans vacios
        if (_contenido.indexOf("<img") < 0) {
            _contenido = _link;
        }

        if (_link.length > 0) {
            this.links.push(_link);
            this.lastIndex++;
        }
    }

    Lector.prototype.getLink = function () {
        if (this._currentLink <= this.lastIndex) {
            return this.links[this._currentLink++];
        } else
            return undefined;
    };
}

module.exports = Lector;