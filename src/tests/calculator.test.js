const test = require("node:test");
const assert = require("node:assert/strict");
const {
  calculate,
  modulo,
  operations,
  power,
  squareRoot,
} = require("../calculator.js");

test("addition", () => {
  assert.equal(calculate(2, "+", 3), 5);
  assert.equal(operations["+"](-2, 3), 1);
  assert.equal(calculate(1.5, "+", 2.25), 3.75);
});

test("subtraction", () => {
  assert.equal(calculate(10, "-", 4), 6);
  assert.equal(operations["-"](3, 5), -2);
  assert.equal(calculate(2.5, "-", 0.5), 2);
});

test("multiplication", () => {
  assert.equal(calculate(45, "*", 2), 90);
  assert.equal(operations["*"](-3, 4), -12);
  assert.equal(calculate(1.5, "*", 2), 3);
});

test("division", () => {
  assert.equal(calculate(20, "/", 5), 4);
  assert.equal(operations["/"](-12, 3), -4);
  assert.equal(calculate(7, "/", 2), 3.5);
});

test("division by zero is rejected", () => {
  assert.throws(() => calculate(1, "/", 0), {
    name: "RangeError",
    message: "Division by zero is not allowed.",
  });
  assert.throws(() => operations["/"](1, 0), RangeError);
});

test("modulo", () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(17, 5), 2);
  assert.equal(modulo(-17, 5), -2);
  assert.equal(modulo(7.5, 2), 1.5);
  assert.equal(calculate(5, "%", 2), 1);
  assert.equal(calculate(17, "%", 5), 2);
  assert.equal(calculate(-17, "%", 5), -2);
  assert.equal(calculate(7.5, "%", 2), 1.5);
});

test("modulo by zero is rejected", () => {
  assert.throws(() => calculate(1, "%", 0), {
    name: "RangeError",
    message: "Modulo by zero is not allowed.",
  });
  assert.throws(() => operations["%"](1, 0), RangeError);
  assert.throws(() => modulo(1, 0), RangeError);
  assert.throws(() => modulo(Infinity, 2), TypeError);
});

test("exponentiation", () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(9, 0.5), 3);
  assert.equal(power(2, -2), 0.25);
  assert.equal(calculate(2, "**", 3), 8);
  assert.equal(calculate(9, "**", 0.5), 3);
  assert.equal(calculate(2, "**", -2), 0.25);
  assert.throws(() => power(10, 1000), RangeError);
  assert.throws(() => power(2, Infinity), TypeError);
});

test("square root", () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(2), Math.sqrt(2));
  assert.equal(squareRoot(0), 0);
  assert.equal(calculate(16, "sqrt"), 4);
  assert.equal(calculate(9, "sqrt"), 3);
  assert.equal(calculate(2, "sqrt"), Math.sqrt(2));
  assert.equal(calculate(0, "sqrt"), 0);
  assert.throws(() => squareRoot(-1), RangeError);
  assert.throws(() => squareRoot(NaN), TypeError);
});

test("invalid square roots and non-finite results are rejected", () => {
  assert.throws(() => calculate(-1, "sqrt"), {
    name: "RangeError",
    message: "Square root of a negative number is not supported.",
  });
  assert.throws(() => calculate(4, "sqrt", 2), TypeError);
  assert.throws(() => calculate(-1, "**", 0.5), RangeError);
  assert.throws(() => calculate(10, "**", 1000), RangeError);
});

test("non-finite operands are rejected", () => {
  assert.throws(() => calculate(Infinity, "+", 1), TypeError);
  assert.throws(() => calculate(1, "*", NaN), TypeError);
});

test("unsupported operations are rejected", () => {
  assert.throws(() => calculate(1, "mod", 2), RangeError);
});
