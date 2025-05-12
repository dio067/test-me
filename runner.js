import fs, { glob } from "fs";
import path from "path";

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTest() {
		for (let file of this.testFiles) {
			const beforeEach = [];
			global.beforeEach = (fn) => {
				beforeEach.push(fn);
			};
			global.it = (desc, fn) => {
				beforeEach.forEach((func) => func());
				try {
					console.log(`OK- ${desc}`);
					fn();
				} catch (err) {
					console.log(`X- ${desc}`);
					console.log(err);
				}
			};
			import(file.name);
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(`${targetPath}`);

		for (let file of files) {
			const filePath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filePath);

			if (stats.isFile() && file.includes(".test.js")) {
				this.testFiles.push({ name: filePath });
			} else if (stats.isDirectory()) {
				const childFiles = await fs.promises.readdir(filePath);

				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}
}

export default Runner;
