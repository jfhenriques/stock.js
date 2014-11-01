(function() {
	"use strict";

	var uuid = require('node-uuid');

	var Company = function (id, name, stocks) {
		if (!(this instanceof Company))
			return new Company();

		this.UUID = id || uuid.v4();
		this.name = name;
		this.totalStocks = stocks;
	};

	module.exports = Company;

})();