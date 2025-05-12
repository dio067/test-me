#!/usr/bin/env node
import Runner from "./runner.js";
console.log("Running");

const runner = new Runner();
const run = async () => {
	await runner.collectFiles(process.cwd());
	runner.runTest();
};

run();
