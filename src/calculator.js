#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), exponentiation (**), and square root (sqrt).
function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number.`);
  }
}

function modulo(a, b) {
  assertFiniteNumber(a, "The first operand");
  assertFiniteNumber(b, "The second operand");
  if (b === 0) {
    throw new RangeError("Modulo by zero is not allowed.");
  }
  return a % b;
}

function power(base, exponent) {
  assertFiniteNumber(base, "The base");
  assertFiniteNumber(exponent, "The exponent");
  const result = base ** exponent;
  if (!Number.isFinite(result)) {
    throw new RangeError("Operation result is not a finite number.");
  }
  return result;
}

function squareRoot(n) {
  assertFiniteNumber(n, "The square-root operand");
  if (n < 0) {
    throw new RangeError("Square root of a negative number is not supported.");
  }
  return Math.sqrt(n);
}

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
  "%": modulo,
  "**": power,
  sqrt: squareRoot,
};

function calculate(left, operator, right) {
  if (!Object.hasOwn(operations, operator)) {
    throw new RangeError('Unsupported operation. Use +, -, *, /, %, **, or sqrt.');
  }

  const isSquareRoot = operator === "sqrt";
  if (!Number.isFinite(left) || (!isSquareRoot && !Number.isFinite(right))) {
    throw new TypeError(
      isSquareRoot
        ? "The square-root operand must be a finite number."
        : "Both operands must be finite numbers.",
    );
  }

  if (isSquareRoot && right !== undefined) {
    throw new TypeError("Square root accepts one operand.");
  }

  const result = isSquareRoot
    ? operations.sqrt(left)
    : operations[operator](left, right);
  if (!Number.isFinite(result)) {
    throw new RangeError("Operation result is not a finite number.");
  }

  return result;
}

function main(args) {
  if (args[0] === "sqrt") {
    if (args.length !== 2) {
      console.error("Usage: node src/calculator.js sqrt <number>");
      process.exitCode = 1;
      return;
    }

    const value = Number(args[1]);
    if (args[1].trim() === "" || !Number.isFinite(value)) {
      console.error("Error: the square-root operand must be a finite number.");
      process.exitCode = 1;
      return;
    }

    try {
      console.log(calculate(value, "sqrt"));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
    return;
  }

  if (args.length !== 3) {
    console.error(
      "Usage: node src/calculator.js <number> <+|-|*|/|%|**> <number> | sqrt <number>",
    );
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

module.exports = { calculate, modulo, operations, power, squareRoot };
