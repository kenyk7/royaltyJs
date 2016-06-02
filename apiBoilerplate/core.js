/**
 * The core app singleton
 * @class App
 */

var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
var cors = require('cors');

var App = {
	Express: {},
	Server: {},
	init: function() {
		App.Express = express();

		App.Express.use(bodyParser());
		App.Express.use(cors());

		require("./routes")();

		App.Server = App.Express.listen(config.port, function() {
		    console.log("Listening on port %d", App.Server.address().port);
		});
	}
};

module.exports = App;