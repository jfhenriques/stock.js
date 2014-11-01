(function() {
	"use strict";

	var Stock = function (company, owner, shares) {
		if (!(this instanceof Stock))
			return new Stock();

		this.company = company;
		this.owner = owner;
		this._shares = shares || 0;

		this._uncommittedShares = undefined;
	};

	module.exports = Stock;

	//Stock.prototype.setPreTransfer = function(newShareQuantity)
	//{
	//	this._uncommittedShares = newShareQuantity;
	//};

	Stock.prototype.getShares = function()
	{
		return ( this._uncommittedShares == undefined )
					? this._shares
					: this._uncommittedShares ;
	};


	Stock.prototype._checkUncommittedChanges = function(quantity)
	{
		if( this._uncommittedShares == undefined )
			this._uncommittedShares = this._shares;

		if( quantity <= 0 )
			throw new Error("Quantity is not positive");
	};

	Stock.prototype.takeShares = function(quantity)
	{
		this._checkUncommittedChanges(quantity);

		if( this._uncommittedShares < quantity )
			throw new Error("Cannot take more shares than available");

		this._uncommittedShares -= quantity;
	};

	Stock.prototype.addShares = function(quantity)
	{
		this._checkUncommittedChanges(quantity);

		this._uncommittedShares += quantity;
	};

	Stock.prototype.commit = function()
	{
		if( this._uncommittedShare != undefined )
		{
			this._shares = this._uncommittedShares;
			this._uncommittedShares = undefined;
		}
	};

	Stock.prototype.rollback = function()
	{
		this._uncommittedShares = undefined;
	};


})();