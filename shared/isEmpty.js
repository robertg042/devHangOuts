const isEmpty = value =>
  typeof value === "undefined" ||
  value === null ||
  (typeof value.length !== "undefined" && value.length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// let test;
// console.log(isEmpty(test));
// test = null;
// console.log(isEmpty(test));
// test = undefined;
// console.log(isEmpty(test));
// test = [];
// console.log(isEmpty(test));
// test = "";
// console.log(isEmpty(test));
// test = " ";
// console.log(isEmpty(test));
// test = {};
// console.log(isEmpty(test));
// test = 0;
// console.log(isEmpty(test));
// test = 2;
// console.log(isEmpty(test));
// test = [2];
// console.log(isEmpty(test));
// test = "[2]";
// console.log(isEmpty(test));
// test = { valNull: null };
// console.log(isEmpty(test));
// test = { id: 1 };
// console.log(isEmpty(test));
// test = { val: [1, 2] };
// console.log(isEmpty(test));

module.exports = isEmpty;
