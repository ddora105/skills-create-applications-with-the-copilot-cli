const test = require("node:test");
const assert = require("node:assert/strict");
const { calculate, operations } = require("../calculator.js");

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

test("non-finite operands are rejected", () => {
  assert.throws(() => calculate(Infinity, "+", 1), TypeError);
  assert.throws(() => calculate(1, "*", NaN), TypeError);
});

test("unsupported operations are rejected", () => {
  assert.throws(() => calculate(1, "%", 2), RangeError);
});
