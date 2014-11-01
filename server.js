"use strict";

var Company = require("./model/company"),
    Entity = require("./model/entity"),
    Stock = require("./model/stock"),
    Transfer = require("./model/transfer");

var ent = new Entity(null, "João Henriques");

console.log(ent.UUID + ", " + ent.name);

var sO = new Stock(null,null, 10),
    sD = new Stock(null,null, 11);

console.log(sO.getShares());
console.log(sD.getShares());

try {
    var transfer = new Transfer(sO, sD, 8);
    transfer.execute();
} catch(err) {
    console.log(err);
}

console.log(sO.getShares());
console.log(sD.getShares());
