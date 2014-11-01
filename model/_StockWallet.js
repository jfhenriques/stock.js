(function() {
	"use strict";

	var StockWallet = function (company, owner, shares) {
		if (!(this instanceof StockWallet))
			return new StockWallet();

		this.company = company;
		this.owner = owner;
		this._shares = shares || 0;

		this._uncommittedShares = undefined;
	};

	module.exports = StockWallet;

	//Stock.prototype.setPreTransfer = function(newShareQuantity)
	//{
	//	this._uncommittedShares = newShareQuantity;
	//};

	StockWallet.prototype.getShares = function()
	{
		return ( this._uncommittedShares === undefined )
					? this._shares
					: this._uncommittedShares ;
	};


	StockWallet.prototype._checkUncommittedChanges = function(quantity)
	{
		if( this._uncommittedShares === undefined )
			this._uncommittedShares = this._shares;

		if( quantity <= 0 )
			throw new Error("Quantity is not positive");
	};

	StockWallet.prototype.takeShares = function(quantity)
	{
		this._checkUncommittedChanges(quantity);

		if( this._uncommittedShares < quantity )
			throw new Error("Cannot take more shares than available");

		this._uncommittedShares -= quantity;
	};

	StockWallet.prototype.addShares = function(quantity)
	{
		this._checkUncommittedChanges(quantity);

		this._uncommittedShares += quantity;
	};

	StockWallet.prototype.commit = function()
	{
		if( this._uncommittedShare !== undefined )
		{
			this._shares = this._uncommittedShares;
			this._uncommittedShares = undefined;
		}
	};

	StockWallet.prototype.rollback = function()
	{
		this._uncommittedShares = undefined;
	};

	StockWallet.prototype.getCompany = function()
	{
		return this.company;
	}


})();