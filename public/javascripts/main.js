/**
 * Created by Koronos on 04/03/2015.
 */
var socket = io.connect("http://localhost:3000");
var links = {
    links: []
};
var contador = 0;

socket.on("message", function (data) {
    $.extend(links.links, data.links);
    $("body").text("");

    console.log(links);

    for (var x = 0; x < links.links.length; x++) {
        $("body").append("<a href=\"" + links.links[x] + "\">" + links.links[x] + "</a><br>");
    }

});