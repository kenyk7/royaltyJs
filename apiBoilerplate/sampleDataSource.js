var _ =  require("underscore");

/**
 * This is just a sample data source and or connector to mock out data
 * being queried in a some data store somewhere.
 */
var datasource = {
	employees: {
		data: [
			{ id: 1, first_name: "John", last_name: "Doe", position: "Architect" },
			{ id: 2, first_name: "Jim", last_name: "Doo", position: "Janitor" },
			{ id: 3, first_name: "Jane", last_name: "Doe", position: "Assasin" }
		]
	},
	todo: {
		data: [
			{
				"id": "1",
				"name": "Boilerplate",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				"priority": "1"
			},
			{
				"id": "2",
				"name": "Api",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				"priority": "2"
			},
			{
				"id": "3",
				"name": "Otro",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				"priority": "3"
			}

		]
	},
	query: function(_object, _query) {
		return _.where(datasource[_object].data, _query);
	}
};

module.exports = datasource;