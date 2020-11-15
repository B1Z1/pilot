"use strict";
exports.__esModule = true;
exports.stopServer = exports.setupServer = void 0;
var robot = require("robotjs");
var cors = require("cors");
var express = require("express");
var path = require("path");
var http = require("http");
var socketIo = require("socket.io");
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
var expressApp;
var server;
var io;
var setupServer = function (ipAddress) {
    expressApp = express();
    server = http.createServer(expressApp);
    io = socketIo(server);
    io.on('connection', function (socket) {
        socket.on('move', function (coords) {
            var x = coords.x, y = coords.y;
            var mouse = robot.getMousePos();
            var newX = mouse.x + x / 3;
            var newY = mouse.y + y / 3;
            robot.moveMouse(newX, newY);
        });
        socket.on('click', function () {
            robot.mouseClick();
        });
        socket.on('text', function (text) {
            robot.typeString(text);
            robot.keyTap('enter');
        });
        socket.on('clear', function () {
            robot.keyTap('a', ['control']);
            robot.keyTap('backspace');
        });
    });
    expressApp.use(cors());
    expressApp.use(express.static(path.join(__dirname, '../../dist')));
    expressApp.get('*', function (req, res) {
        console.log('work');
        console.log(path.join(__dirname, '../../dist/index.html'));
        res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
        // if (serve) {
        //   res.redirect(`http://${ ipAddress }:4200/pilot`);
        // } else {
        //   res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
        // }
    });
    server.listen(3000, ipAddress, function () {
        console.log(ipAddress + ':3000');
    });
};
exports.setupServer = setupServer;
var stopServer = function () {
    server.close();
    io.close();
    io = undefined;
    server = undefined;
    expressApp = undefined;
};
exports.stopServer = stopServer;
//# sourceMappingURL=webServer.js.map