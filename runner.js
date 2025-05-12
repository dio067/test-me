import fs, { glob } from "fs";
import path from "path";
import chalk from "chalk";
import render from "./render.js";

const forbiddenDirs = ["node_modules"];
class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTest() {
		for (let file of this.testFiles) {
			console.log(chalk.gray(`-----${file.shortName}`));
			const beforeEaches = [];
			global.render = render;
			global.beforeEach = (fn) => {
				beforeEaches.push(fn);
			};
			global.it = async (desc, fn) => {
				beforeEaches.forEach((func) => func());
				try {
					await fn();
					console.log(chalk.green(`OK - ${desc}`));
				} catch (err) {
					const message = err.message.replace(/\n/g, "\n\t\t");
					console.log(chalk.red(`X - ${desc}`));
					console.log(chalk.red("\t", message));
				}
			};

			try {
				import(file.name);
			} catch (err) {
				console.log(chalk.red(err));
			}
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(`${targetPath}`);

		for (let file of files) {
			const filePath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filePath);

			if (stats.isFile() && file.includes(".test.js")) {
				this.testFiles.push({ name: filePath, shortName: file });
			} else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
				const childFiles = await fs.promises.readdir(filePath);

				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}
}

export default Runner;
