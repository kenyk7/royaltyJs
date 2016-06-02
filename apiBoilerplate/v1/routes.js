/**
 * Establishing the routes / API's for this server
 */

var App = require("../core");
var _ =  require("underscore");
var errorHandling = require("./errorHandling");
var tokens = require("../tokens");
var config = require("../config").v1;

module.exports = function() {
	var model = require("./model")();

	// Validate token in routine
	function validateToken(req, res, next) {
		// Handle secret admin access
		// if(config.adminKeyEnabled && req.query.secret_admin === config.adminKey) {
			next();
		// } else {
		// 	try {
		// 		if(!req.headers.api_token) {
		// 			throw { code: "NO_TOKEN" };
		// 		}

		// 		if(!req.headers.api_secret) {
		// 			throw { code: "NO_TOKEN" };
		// 		}

		// 		if(!tokens[req.headers.api_token]) {
		// 			throw { code: "INVALID_TOKEN" };
		// 		}

		// 		if(!tokens[req.headers.api_token].secret !== req.headers.api_secret) {
		// 			throw { code: "INVALID_TOKEN" };
		// 		}

		// 		next();
		// 	} catch(e) {
		// 		errorHandling.handle(e, res);
		// 	}
		// }
	}

	/**
     * LOGIN
     */
    App.Express.post("/:version/login", function (req, res) {
        var value = req.body;

        var response = {
            "access_token": "CAACEdEose0cBAEX3TTKigK5OGNlhQ2kcthWO",
            "user_info": "Keny Romero"
        };

        if(value.user == 'error'){
            res.status(400);
        }else{
            res.status(200);
        }
        res.send(response);
    });

    /**
     * TODO
     */
    // Get
    App.Express.get("/:version/todo", validateToken, function (req, res) {
		model.retrieve("todo", function(_response) {
			if(!_response.success) {
				errorHandling.handle(_response.error, res);
			} else {
				res.send(_response.results);
			}
		});
	});
	// Add
    App.Express.post("/:version/todo", validateToken, function (req, res) {
        var value = req.body;

        if(value.name == 'error'){
            res.status(400);
        }else{
            res.status(200);
        }
        res.send();
    });
    // Get single
    App.Express.get("/:version/todo/:todoId", validateToken, function (req, res) {
        try {
            if(!req.params.todoId) {
                throw { code: "ERROR" };
            }

            model.query("todo", { "id": req.params.todoId }, function(_response) {
                res.send(_response.results);
            });

        } catch(e) {
            errorHandling.handle(e, res);
        }
    });
    // Update
    App.Express.put("/:version/todo/:todoId", validateToken, function (req, res) {
        var value = req.body;

        if(value.name == 'error'){
            res.status(400);
        }else{
            res.status(200);
        }
        res.send();
    });
    // Delete
    App.Express.delete("/:version/todo/:todoId", validateToken, function (req, res) {
        var value = req.body;

        if(req.params.todoId == '1'){
            res.status(400);
        }else{
            res.status(200);
        }
        res.send();
    });



    // example base + doc
    
	/**
	 * @api {get} /employees/ Get all employees
	 * @apiVersion 1.0.0
	 * @apiGroup Employees
	 * @apiName GetEmployees
	 * @apiDescription Returns a list of all employees
	 *
	 * @apiExample Example usage:
	 *     http://api.yourapp.com/1/employees
	 *
	 * @apiParam (Headers) {String} api_token The API token assigned to your app
	 * @apiParam (Headers) {String} api_secret The API secret assigned to your app
	 *
	 * @apiSuccess {Boolean} success Success / Failure flag on data returned
	 * @apiSuccess {Number} numberOfRecords The number of records in the results
	 * @apiSuccess {Array} results The available results
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 *  {
			"success": true,
			"numberOfRecords": 1,
			"results": [{
				"id": 12345,
				"firstname": "John",
				"lastname": "Doe",
				"position": "Architect"
			}]
	 *  }
	 */
	App.Express.get("/:version/employees", validateToken, function (req, res) {
		model.retrieve("employees", function(_response) {
			if(!_response.success) {
				errorHandling.handle(_response.error, res);
			} else {
				res.send(_response);
			}
		});
	});

	/**
	 * @api {get} /employees/:employeeId Get employee by ID
	 * @apiVersion 1.0.0
	 * @apiGroup Employees
	 * @apiName GetEmployeeByID
	 * @apiDescription Returns the desired employee
	 *
	 * @apiExample Example usage:
	 *     http://api.yourapp.com/1/employee/102
	 *
	 * @apiParam (Headers) {String} api_token The API token assigned to your app
	 * @apiParam (Headers) {String} api_secret The API secret assigned to your app
	 *
	 * @apiSuccess {Boolean} success Success / Failure flag on data returned
	 * @apiSuccess {Object} results The available results
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 *  {
			"success": true,
			"numberOfRecords": 1,
			"results": {
				"id": 12345,
				"firstname": "John",
				"lastname": "Doe",
				"position": "Architect"
			}
	 *  }
	 *
	 * @apiParam (Endpoint) {Number} employeeId The employee ID
	 */
	App.Express.get("/:version/employees/:employeeId", validateToken, function(req, res) {
		try {
			if(!req.params.employeeId) {
				throw { code: "NO_EMPLOYEE_ID" };
			}

			model.query("employees", { id: parseInt(req.params.employeeId) }, function(_response) {
				if(!_response.success) {
					errorHandling.handle(_response.error, res);
				} else {
					res.send(_response);
				}
			});

		} catch(e) {
			errorHandling.handle(e, res);
		}
	});
};