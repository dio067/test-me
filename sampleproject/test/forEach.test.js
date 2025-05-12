import assert from "assert";
import shit from "../script.js";

let numbers;

beforeEach(() => {
	numbers = [1, 2, 3];
});

it("should sum an array", () => {
	let total = 0;
	shit.forEach(numbers, (value) => {
		total += value;
	});

	assert.strictEqual(total, 7);
	numbers.push(3);
	numbers.push(3);
	numbers.push(3);
});
it("beforeEach is ran each time", () => {
	assert.strictEqual(numbers.length, 3);
});
