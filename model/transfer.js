(function() {
    "use strict";

    var Stock = require('./stock');

    var Transfer = function (stockOrig, stockDest, quantity, cost) {
        if (!(this instanceof Transfer))
            return new Transfer();

        this.stockOrig = stockOrig;
        this.stockDest = stockDest;
        this.quantity = quantity || 0;
        this.cost = cost || 0;
        this._executed = false;
    };

    module.exports = Transfer;

    Transfer.prototype.execute = function()
    {
        if(!this._executed)
        {
            if(    !(this.stockOrig instanceof Stock)
                || !(this.stockDest instanceof Stock) )
                throw new Error("Cannot execute null transfers");

            try {
                this.stockOrig.takeShares(this.quantity);
                this.stockDest.addShares(this.quantity);

                this.stockOrig.commit();
                this.stockDest.commit();

                this._executed = true;
            } catch(err) {
                this.stockOrig.rollback();
                this.stockDest.rollback();

                throw err;
            }
        }
    }
})();