"use strict";

var Company = require("./model/Company"),
    Entity = require("./model/Entity"),
    StockWallet = require("./model/StockWallet"),
    Transfer = require("./model/Transfer");

var comp1 = new Company(null, "Facebrook"),
    comp2 = new Company(null, "Fakebrook"),
    ent1 = new Entity(null, "John Bigodes"),
    ent2 = new Entity(null, "John Macarrão");

console.log(comp1.UUID + ", " + comp1.name);
console.log(comp2.UUID + ", " + comp2.name);
console.log(ent1.UUID + ", " + ent1.name);
console.log(ent2.UUID + ", " + ent2.name);

var sO = new StockWallet(comp1, ent1, 10),
    sD = new StockWallet(comp1, ent2, 11);

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
