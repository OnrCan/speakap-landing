"use strict";

var foo = ['a', 'b', 'c'];
var bar = [].concat(foo).map(function (el) {
  return el.toUpperCase();
});
console.log(bar);