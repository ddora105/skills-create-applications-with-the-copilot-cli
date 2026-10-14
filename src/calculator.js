#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
const operations = {
  "+": (left, right) => left + right,
  "-": (left, right) => left - right,
  "*": (left, right) => left * right,
  "/": (left, right) => {
    if (right === 0) {
      throw new RangeError("Division by zero is not allowed.");
    }
    return left / right;
  },
};

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError("Both operands must be finite numbers.");
  }

  if (!Object.hasOwn(operations, operator)) {
    throw new RangeError(`Unsupported operation "${operator}". Use +, -, *, or /.`);
  }

  return operations[operator](left, right);
}

function main(args) {
  if (args.length !== 3) {
    console.error("Usage: node src/calculator.js <number> <+|-|*|/> <number>");
    process.exitCode = 1;
    return;
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (
    leftInput.trim() === "" ||
    rightInput.trim() === "" ||
    !Number.isFinite(left) ||
    !Number.isFinite(right)
  ) {
    console.error("Error: both operands must be finite numbers.");
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(left, operator, right));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { calculate, operations };
