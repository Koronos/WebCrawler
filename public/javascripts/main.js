/**
 * Created by Koronos on 04/03/2015.
 */
var socket = io.connect("http://localhost:3000");
socket.on("message", function (data) {
    $("body").append("<a>" + data.dato + "</a>");
})